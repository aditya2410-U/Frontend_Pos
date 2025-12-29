import type { ColDef } from "ag-grid-community";
import type { Role } from "@/api/schemas/role";
import type { User } from "@/api/schemas/user";
import type { Outlet } from "@/api/schemas/outlet";
import { CustomCellRenderer } from "@/common/DataTable";

/**
 * ============================================
 * AG-GRID COLUMN DEFINITION REFERENCE
 * ============================================
 *
 * SIZING:
 * - width: number              - Fixed width in pixels (e.g., width: 100)
 * - minWidth: number           - Minimum width in pixels
 * - maxWidth: number           - Maximum width in pixels
 * - flex: number               - Flex ratio (0 = fixed, 1+ = flexible)
 * - autoHeight: boolean        - Auto-adjust row height based on content
 *
 * FILTERING:
 * - filter: false              - Disable filter for this column
 * - filter: true               - Enable default filter
 * - filter: "agTextColumnFilter"    - Text filter
 * - filter: "agNumberColumnFilter"  - Number filter
 * - filter: "agDateColumnFilter"    - Date filter
 * - filter: "agSetColumnFilter"     - Set/dropdown filter (Enterprise)
 * - floatingFilter: boolean    - Show/hide floating filter input
 *
 * SORTING:
 * - sortable: boolean          - Enable/disable sorting
 * - sort: "asc" | "desc"       - Default sort direction
 * - sortIndex: number          - Multi-column sort order
 *
 * MENU & UI:
 * - suppressHeaderMenuButton: boolean - Hide header menu button
 * - headerClass: string        - CSS class for header
 * - headerTooltip: string      - Tooltip for header
 *
 * STYLING:
 * - cellClass: string | string[] | function  - CSS class for cells
 * - cellStyle: object | function             - Inline styles for cells
 *   Example: cellStyle: { color: "red", fontWeight: "bold" }
 *   Example: cellStyle: (params) => params.value < 0 ? { color: "red" } : null
 *
 * EDITING:
 * - editable: boolean | function  - Enable cell editing
 * - cellEditor: string            - Editor component
 *
 * RESIZING & MOVING:
 * - resizable: boolean         - Allow column resize
 * - suppressMovable: boolean   - Prevent column from being moved
 * - lockPosition: boolean      - Lock column position (left/right)
 * - lockPinned: boolean        - Prevent un-pinning
 *
 * PINNING:
 * - pinned: "left" | "right"   - Pin column to left or right
 *
 * HIDING:
 * - hide: boolean              - Hide column initially
 * - lockVisible: boolean       - Prevent showing/hiding
 *
 * ============================================
 */

/**
 * Role Table Column Definitions
 */
export const ROLE_COLUMNS: ColDef<Role>[] = [
  {
    headerName: "No.",
    valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
    width: 80,
    minWidth: 60,
    maxWidth: 100,
    flex: 0,
    sortable: false,
    filter: false,
    suppressHeaderMenuButton: true,
    resizable: false,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "Role Name",
    field: "name",
    flex: 1,
    minWidth: 150,
    cellClass: "font-medium",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Description",
    field: "description",
    flex: 1.5,
    minWidth: 200,
    valueFormatter: (params) => params.value || "-",
    filter: "agTextColumnFilter",
  },
];

/**
 * User Table Column Definitions (static columns only)
 * Dynamic columns (Status, Actions) are added in the component
 */
export const USER_COLUMNS: ColDef<User>[] = [
  {
    headerName: "Name",
    field: "name",
    flex: 1.5,
    minWidth: 150,
    cellClass: "font-medium",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Email",
    field: "email",
    flex: 2,
    minWidth: 200,
    filter: "agTextColumnFilter",
  },
];

/**
 * Outlet Table Column Definitions (static columns only)
 * Dynamic columns (Status, Actions) are added in the component
 */
export const OUTLET_COLUMNS: ColDef<Outlet>[] = [
  {
    headerName: "Name",
    field: "name",
    flex: 1.5,
    minWidth: 150,
    cellClass: "font-medium",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Address",
    field: "address",
    flex: 2,
    minWidth: 200,
    valueFormatter: (params) => params.value || "-",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Created At",
    field: "createdAt",
    flex: 1,
    minWidth: 120,
    valueFormatter: (params) =>
      params.value ? new Date(params.value).toLocaleDateString() : "-",
    filter: false,
  },
];

/**
 * Common Action Column Template
 * Use this as a base and customize in components
 */
export const ACTION_COLUMN_BASE: ColDef = {
  headerName: "Actions",
  field: "id",
  flex: 0,
  width: 120,
  minWidth: 100,
  maxWidth: 150,
  sortable: false,
  filter: false,
  suppressHeaderMenuButton: true,
  resizable: false,
  pinned: "right",
  lockPinned: true,
  cellStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

/**
 * ============================================
 * EXTENDED COLUMN DEFINITION TYPE
 * ============================================
 *
 * Adds custom properties that Ultron uses:
 * - hideFilter: boolean     - Hide filter for this column
 * - disabled: boolean       - Disable cell editing
 * - dtype: string           - Data type for custom cell rendering
 * - clickable: boolean      - Whether cell is clickable
 * - displayType: string     - Display type for custom renderers
 */
export interface ExtendedColDef<T = unknown> extends ColDef<T> {
  hideFilter?: boolean;
  disabled?: boolean;
  dtype?: string;
  clickable?: boolean;
  displayType?: string;
  isSortable?: boolean;
  on_toggle?: (data: T) => void;
  on_click?: (data: T) => void;
  active_label?: string;
  inactive_label?: string;
  active_variant?: "default" | "secondary" | "destructive" | "outline";
  inactive_variant?: "default" | "secondary" | "destructive" | "outline";
}

/**
 * Process columns with extended properties (Ultron-style)
 * Converts custom properties to AG-Grid compatible properties
 *
 * @param columns - Array of extended column definitions
 * @returns - Array of processed ColDef
 */
export function processColumns<T>(columns: ExtendedColDef<T>[]): ColDef<T>[] {
  return columns.map((column, index) => {
    const {
      hideFilter,
      disabled,
      dtype,
      clickable,
      displayType,
      isSortable,
      on_toggle,
      on_click,
      active_label,
      inactive_label,
      active_variant,
      inactive_variant,
      ...rest
    } = column;

    const processedColumn: ColDef<T> = { ...rest };

    if (hideFilter) {
      processedColumn.filter = false;
      processedColumn.floatingFilter = false;
    }

    if (disabled) {
      processedColumn.editable = false;
    }

    if (isSortable === false) {
      processedColumn.sortable = false;
    }

    if (dtype) {
      processedColumn.cellRenderer = CustomCellRenderer;
      processedColumn.cellRendererParams = {
        dtype,
        clickable,
        displayType,
        on_toggle,
        on_click,
        active_label,
        inactive_label,
        active_variant,
        inactive_variant,
      };
    }

    processedColumn.headerClass = `custom-header-color-${index % 2 === 0 ? "even" : "odd"}`;

    return processedColumn;
  });
}

/**
 * Apply alternating header colors to columns
 * @param columns - Array of column definitions
 * @returns - Array of column definitions with headerClass applied
 */
export function applyAlternatingHeaderColors<T>(
  columns: ColDef<T>[]
): ColDef<T>[] {
  return columns.map((column, index) => ({
    ...column,
    headerClass: `custom-header-color-${index % 2 === 0 ? "even" : "odd"}`,
  }));
}

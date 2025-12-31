"use client";

import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridReadyEvent,
  SelectionChangedEvent,
  CellValueChangedEvent,
  FilterChangedEvent,
  RowDragEndEvent,
  FirstDataRenderedEvent,
  GridOptions,
  GetRowIdParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { cn } from "@/lib/utils";
import "./styles.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

export interface DataTableProps<TData = unknown> {
  /** Row data to display */
  rowData: TData[];
  /** Column definitions */
  columnDefs: ColDef<TData>[];
  /** Optional table ID */
  id?: string;
  /** Optional custom class name */
  className?: string;
  /** Container style overrides */
  containerStyle?: React.CSSProperties;
  /** Height of the table container */
  height?: string | number;
  /** Row height in pixels */
  rowHeight?: number;
  /** Header height in pixels */
  headerHeight?: number;
  /** Enable row selection */
  rowSelection?: "single" | "multiple";
  /** Enable row dragging */
  rowDragManaged?: boolean;
  /** Suppress row click selection */
  suppressRowClickSelection?: boolean;
  /** Enable pagination */
  pagination?: boolean;
  /** Number of rows per page */
  paginationPageSize?: number;
  /** Page size options */
  paginationPageSizeSelector?: number[];
  /** Enable floating filters */
  floatingFilter?: boolean;
  /** Show loading overlay */
  loading?: boolean;
  /** Custom loading text */
  loadingOverlayText?: string;
  /** Custom no rows text */
  noRowsOverlayText?: string;
  /** Grid ready callback */
  onGridReady?: (event: GridReadyEvent<TData>) => void;
  /** Selection changed callback */
  onSelectionChanged?: (event: SelectionChangedEvent<TData>) => void;
  /** Cell value changed callback */
  onCellValueChanged?: (event: CellValueChangedEvent<TData>) => void;
  /** Filter changed callback */
  onFilterChanged?: (event: FilterChangedEvent<TData>) => void;
  /** Row drag end callback */
  onRowDragEnd?: (event: RowDragEndEvent<TData>) => void;
  /** First data rendered callback */
  onFirstDataRendered?: (event: FirstDataRenderedEvent<TData>) => void;
  /** Get row ID for optimal rendering */
  getRowId?: (params: GetRowIdParams<TData>) => string;
  /** Additional grid options */
  gridOptions?: GridOptions<TData>;
  /** Default column definition */
  defaultColDef?: ColDef<TData>;
  /** Auto-size columns on first render */
  autoSizeColumns?: boolean;
  /** Single click to edit cells */
  singleClickEdit?: boolean;
  /** Animate rows on data change */
  animateRows?: boolean;
  /** Suppress horizontal scroll */
  suppressHorizontalScroll?: boolean;
  /** Enable editable cells */
  editable?: boolean;
  /** Suppress column header menu button */
  suppressHeaderMenuButton?: boolean;
  /** Suppress context menu */
  suppressContextMenu?: boolean;
  /** Suppress cell focus */
  suppressCellFocus?: boolean;
  /** Suppress column moving */
  suppressMovableColumns?: boolean;
  /** Suppress column resize */
  suppressColumnMoveAnimation?: boolean;
  /** Floating filters height */
  floatingFiltersHeight?: number;
  /** Header height */
  groupHeaderHeight?: number;
}

const DataTable = <TData extends object = object>({
  rowData,
  columnDefs,
  id,
  className,
  containerStyle,
  height = "400px",
  rowHeight = 40,
  headerHeight = 42,
  rowSelection,
  rowDragManaged = false,
  suppressRowClickSelection = true,
  pagination = false,
  paginationPageSize = 20,
  paginationPageSizeSelector = [10, 20, 50, 100],
  floatingFilter = false,
  loading = false,
  loadingOverlayText = "Loading...",
  noRowsOverlayText = "No data to display",
  onGridReady,
  onSelectionChanged,
  onCellValueChanged,
  onFilterChanged,
  onRowDragEnd,
  onFirstDataRendered,
  getRowId,
  gridOptions,
  defaultColDef: customDefaultColDef,
  autoSizeColumns = true,
  singleClickEdit = false,
  animateRows = true,
  suppressHorizontalScroll = false,
  editable = false,
  suppressHeaderMenuButton = false,
  suppressContextMenu = false,
  suppressCellFocus = false,
  suppressMovableColumns = false,
  suppressColumnMoveAnimation = false,
  floatingFiltersHeight,
  groupHeaderHeight,
}: DataTableProps<TData>) => {
  const gridRef = useRef<AgGridReact<TData>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Attach scroll listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Find scrollable viewports
    const attachListeners = () => {
      const bodyViewport = container.querySelector(
        ".ag-body-viewport"
      ) as HTMLElement;
      const headerViewport = container.querySelector(
        ".ag-header-viewport"
      ) as HTMLElement;

      if (bodyViewport) {
        bodyViewport.addEventListener("scroll", handleScroll, {
          passive: true,
        });
      }

      if (headerViewport) {
        headerViewport.addEventListener("scroll", handleScroll, {
          passive: true,
        });
      }

      return () => {
        if (bodyViewport) {
          bodyViewport.removeEventListener("scroll", handleScroll);
        }
        if (headerViewport) {
          headerViewport.removeEventListener("scroll", handleScroll);
        }
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    };

    // Try immediately and after delay
    let cleanup = attachListeners();
    const timeoutId = setTimeout(() => {
      if (cleanup) cleanup();
      cleanup = attachListeners();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, [rowData]);

  // Default column definition
  const defaultColDef = useMemo<ColDef<TData>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter,
      minWidth: 100,
      flex: 1,
      editable,
      suppressHeaderMenuButton,
      ...customDefaultColDef,
    }),
    [floatingFilter, editable, suppressHeaderMenuButton, customDefaultColDef]
  );

  // Handle grid ready
  const handleGridReady = useCallback(
    (event: GridReadyEvent<TData>) => {
      if (autoSizeColumns) {
        event.api.sizeColumnsToFit();
      }
      onGridReady?.(event);
    },
    [autoSizeColumns, onGridReady]
  );

  // Handle first data rendered
  const handleFirstDataRendered = useCallback(
    (event: FirstDataRenderedEvent<TData>) => {
      if (autoSizeColumns) {
        event.api.sizeColumnsToFit();
      }
      onFirstDataRendered?.(event);
    },
    [autoSizeColumns, onFirstDataRendered]
  );

  // Container style - use 90vh as max height, full height otherwise
  const tableStyle = useMemo(
    () => ({
      height: typeof height === "number" ? `${height}px` : height,
      maxHeight: "90vh",
      width: "100%",
      ...containerStyle,
    }),
    [height, containerStyle]
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn(
        "ag-theme-custom",
        isScrolling && "is-scrolling",
        className
      )}
      style={tableStyle}
    >
      <AgGridReact<TData>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        rowSelection={rowSelection}
        rowDragManaged={rowDragManaged}
        suppressRowClickSelection={suppressRowClickSelection}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        animateRows={animateRows}
        singleClickEdit={singleClickEdit}
        suppressHorizontalScroll={suppressHorizontalScroll}
        loading={loading}
        overlayLoadingTemplate={`<span class="ag-overlay-loading-center">${loadingOverlayText}</span>`}
        overlayNoRowsTemplate={`<span class="ag-overlay-no-rows-center">${noRowsOverlayText}</span>`}
        onGridReady={handleGridReady}
        onSelectionChanged={onSelectionChanged}
        onCellValueChanged={onCellValueChanged}
        onFilterChanged={onFilterChanged}
        onRowDragEnd={onRowDragEnd}
        onFirstDataRendered={handleFirstDataRendered}
        getRowId={getRowId}
        tooltipShowDelay={0}
        tooltipHideDelay={2000}
        suppressDragLeaveHidesColumns={true}
        suppressContextMenu={suppressContextMenu}
        suppressCellFocus={suppressCellFocus}
        suppressMovableColumns={suppressMovableColumns}
        suppressColumnMoveAnimation={suppressColumnMoveAnimation}
        floatingFiltersHeight={floatingFiltersHeight}
        groupHeaderHeight={groupHeaderHeight}
        {...gridOptions}
      />
    </div>
  );
};

export default DataTable;

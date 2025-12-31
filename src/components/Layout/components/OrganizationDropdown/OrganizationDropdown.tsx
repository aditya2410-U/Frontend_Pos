import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { SidebarMenuButton } from "@/common/@atoms/sidebar";
import CustomText from "@/common/@atoms/Text/CustomText";
import { IconChevronDown } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/@atoms/dropdown-menu";
import { DEFAULT_TAGS } from "@/common/DataTable/constants";
import utils from "../../helper";
import { getOrganizationDropdownSections } from "../../constants";
import type { OrganizationDropdownSection } from "../../constants";
import styles from "./styles/organizationDropdown.module.css";

interface OrganizationDropdownProps {
  organizationName: string;
  onLogout: () => void;
}

export function OrganizationDropdown({
  organizationName,
  onLogout,
}: OrganizationDropdownProps) {
  const navigate = useNavigate();
  const dropdownSections = getOrganizationDropdownSections();

  const handleItemClick = (item: { url?: string; label: string }) => {
    if (item.label === "Sign out") {
      onLogout();
    } else if (item.url) {
      navigate(item.url);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className={styles.triggerButton}>
          <DEFAULT_TAGS.DIV className={styles.triggerContentWrapper}>
            <DEFAULT_TAGS.DIV className={styles.organizationLogoContainer}>
              {utils.getOrganizationLogo(organizationName)}
            </DEFAULT_TAGS.DIV>
            <CustomText
              type="H6"
              className="text-foreground truncate"
              fontWeight={600}
            >
              {organizationName}
            </CustomText>
            <IconChevronDown stroke={1} size={16} className="shrink-0" />
          </DEFAULT_TAGS.DIV>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DEFAULT_TAGS.DIV className="ml-2">
        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={8}
          className={styles.dropdownContent}
          style={{
            border: "none",
          }}
        >
          <DEFAULT_TAGS.DIV className="border border-border rounded-sm px-1">
            <DropdownMenuItem className={styles.workspaceHeaderItem}>
              <DEFAULT_TAGS.DIV className={styles.workspaceLogoContainer}>
                {utils.getOrganizationLogo(organizationName)}
              </DEFAULT_TAGS.DIV>
              <DEFAULT_TAGS.DIV className={styles.workspaceInfoContainer}>
                <DEFAULT_TAGS.SPAN className={styles.workspaceName}>
                  {organizationName}
                </DEFAULT_TAGS.SPAN>
                <DEFAULT_TAGS.SPAN className={styles.workspaceSubtitle}>
                  Current workspace
                </DEFAULT_TAGS.SPAN>
              </DEFAULT_TAGS.DIV>
              <DEFAULT_TAGS.DIV className={styles.workspaceStatusIndicator} />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {map(
              dropdownSections,
              (section: OrganizationDropdownSection, sectionIndex: number) => (
                <DEFAULT_TAGS.DIV
                  key={sectionIndex}
                  className={styles.sectionWrapper}
                >
                  {map(section.items, (item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.label}
                        className={
                          item.variant === "destructive"
                            ? styles.menuItemDestructive
                            : styles.menuItem
                        }
                        onClick={() => handleItemClick(item)}
                      >
                        <Icon className={styles.iconContainer} stroke={1.5} />
                        <DEFAULT_TAGS.SPAN className={styles.menuItemLabel}>
                          {item.label}
                        </DEFAULT_TAGS.SPAN>
                      </DropdownMenuItem>
                    );
                  })}
                  {section.separatorAfter && <DropdownMenuSeparator />}
                </DEFAULT_TAGS.DIV>
              )
            )}
          </DEFAULT_TAGS.DIV>
        </DropdownMenuContent>
      </DEFAULT_TAGS.DIV>
    </DropdownMenu>
  );
}

import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  Bold,
  Italic,
  Search,
  Underline,
  FolderCode,
  ChevronRight,
  Home,
  User,
  Settings,
  CreditCard,
  LogOut,
  Plus,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Moon,
  Sun,
  Laptop,
  Bell,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  Cloud,
  Github,
  Keyboard,
  LifeBuoy,
  Users,
  Image,
  FileText,
  MoreHorizontal,
  Trash,
  Pencil,
  Copy,
  Terminal,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Loader2,
  GripVertical,
} from "lucide-react";
import { Button } from "./common/@atoms/Button";
import CustomText from "./common/@atoms/Text/CustomText";
import { Input } from "./common/@atoms/input";
import { ModeToggle } from "./common/@atoms/mode-toggle";
import { Textarea } from "./common/@atoms/textarea";
import { Checkbox } from "./common/@atoms/checkbox";
import { Switch } from "./common/@atoms/switch";
import { Toggle } from "./common/@atoms/toggle";
import { ToggleGroup, ToggleGroupItem } from "./common/@atoms/toggle-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "./common/@atoms/dropdown-menu";
import { Separator } from "./common/@atoms/separator";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
} from "./common/@atoms/input-group";
import {
  Empty,
  EmptyHeader,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
  EmptyMedia,
} from "./common/@atoms/empty";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./common/@atoms/popover";
import { Label } from "./common/@atoms/label";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./common/@atoms/sheet";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarMenu,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarCheckboxItem,
} from "./common/@atoms/menubar";
import { RadioGroup, RadioGroupItem } from "./common/@atoms/radio-group";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./common/@atoms/accordion";
import { Alert, AlertTitle, AlertDescription } from "./common/@atoms/alert";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./common/@atoms/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "./common/@atoms/avatar";
import { Badge } from "./common/@atoms/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./common/@atoms/breadcrumb";
import { Calendar } from "./common/@atoms/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./common/@atoms/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./common/@atoms/collapsible";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./common/@atoms/command";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "./common/@atoms/context-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./common/@atoms/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./common/@atoms/drawer";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./common/@atoms/hover-card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./common/@atoms/input-otp";
import { Kbd } from "./common/@atoms/kbd";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./common/@atoms/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./common/@atoms/pagination";
import { Progress } from "./common/@atoms/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./common/@atoms/resizable";
import { ScrollArea } from "./common/@atoms/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "./common/@atoms/select";
import { Skeleton } from "./common/@atoms/skeleton";
import { Slider } from "./common/@atoms/slider";
import { Spinner } from "./common/@atoms/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./common/@atoms/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./common/@atoms/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./common/@atoms/tooltip";
import { Toaster } from "./common/@atoms/sonner";
import { toast } from "sonner";
import { useState } from "react";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(60);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  G
                </span>
              </div>
              <span className="font-semibold text-lg">Ghanshyam UI</span>
            </div>
            <div className="flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">
                            Buttons
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Beautiful button components with variants.
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">
                            Forms
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Input fields, selects, and more.
                          </p>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <ModeToggle />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <Badge className="mb-4">50+ Components</Badge>
          <CustomText
            type="H1"
            className="font-light tracking-tight leading-tight mb-2"
            fontWeight={400}
          >
            Complete Component Library
          </CustomText>
          <CustomText
            type="H1"
            className="font-light tracking-tight mb-8"
            fontWeight={400}
          >
            Showcase
          </CustomText>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our comprehensive collection of beautifully crafted UI
            components built with Radix UI and Tailwind CSS.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              icon={<ArrowRightIcon className="size-4" />}
              iconPosition="right"
            >
              Get Started
            </Button>
            <Button variant="outlined" size="lg">
              Documentation
            </Button>
          </div>
        </section>

        <Separator className="container mx-auto" />

        {/* Components Showcase */}
        <main className="container mx-auto px-6 py-12">
          <div className="grid gap-16">
            {/* ==================== BUTTONS ==================== */}
            <section id="buttons">
              <h2 className="text-2xl font-semibold mb-2">Buttons</h2>
              <p className="text-muted-foreground mb-6">
                Various button styles, sizes, and states.
              </p>

              <div className="grid gap-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Variants
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button>Default</Button>
                    <Button variant="outlined">Outlined</Button>
                    <Button variant="text">Text</Button>
                    <Button variant="dashed">Dashed</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Sizes
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    With Icons
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button icon={<Search className="size-4" />}>Search</Button>
                    <Button
                      variant="outlined"
                      icon={<ArrowRightIcon className="size-4" />}
                      iconPosition="right"
                    >
                      Continue
                    </Button>
                    <Button size="icon">
                      <Plus className="size-4" />
                    </Button>
                    <Button size="icon-sm" variant="outlined">
                      <Settings className="size-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Types
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button buttonType="success">Success</Button>
                    <Button buttonType="error">Error</Button>
                    <Button buttonType="warning">Warning</Button>
                    <Button buttonType="info">Info</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    States
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button disabled>Disabled</Button>
                    <Button disabled variant="outlined">
                      Disabled Outlined
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* ==================== BADGES ==================== */}
            <section id="badges">
              <h2 className="text-2xl font-semibold mb-2">Badges</h2>
              <p className="text-muted-foreground mb-6">
                Small status indicators and labels.
              </p>

              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </section>

            <Separator />

            {/* ==================== ALERTS ==================== */}
            <section id="alerts">
              <h2 className="text-2xl font-semibold mb-2">Alerts</h2>
              <p className="text-muted-foreground mb-6">
                Contextual feedback messages.
              </p>

              <div className="grid gap-4 max-w-2xl">
                <Alert>
                  <Terminal className="size-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the CLI.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your session has expired. Please log in again.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            <Separator />

            {/* ==================== AVATAR ==================== */}
            <section id="avatar">
              <h2 className="text-2xl font-semibold mb-2">Avatar</h2>
              <p className="text-muted-foreground mb-6">
                User profile images with fallback.
              </p>

              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/vercel.png"
                    alt="@vercel"
                  />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="size-16">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </section>

            <Separator />

            {/* ==================== BREADCRUMB ==================== */}
            <section id="breadcrumb">
              <h2 className="text-2xl font-semibold mb-2">Breadcrumb</h2>
              <p className="text-muted-foreground mb-6">
                Navigation hierarchy indicator.
              </p>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>

            <Separator />

            {/* ==================== CARDS ==================== */}
            <section id="cards">
              <h2 className="text-2xl font-semibold mb-2">Cards</h2>
              <p className="text-muted-foreground mb-6">
                Container for grouped content.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>
                      Card description goes here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content with some text.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      You have 3 unread messages.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <Bell className="size-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Send notifications to device.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-name">Name</Label>
                        <Input id="card-name" placeholder="Project name" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outlined">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <Separator />

            {/* ==================== FORM CONTROLS ==================== */}
            <section id="form-controls">
              <h2 className="text-2xl font-semibold mb-2">Form Controls</h2>
              <p className="text-muted-foreground mb-6">
                Input fields, checkboxes, switches, and more.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Text Inputs
                    </h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="disabled">Disabled</Label>
                        <Input
                          id="disabled"
                          disabled
                          placeholder="Disabled input"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Textarea
                    </h3>
                    <Textarea placeholder="Type your message here..." />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Select
                    </h3>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="grape">Grape</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Checkbox & Switch
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">
                          Accept terms and conditions
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox id="marketing" defaultChecked />
                        <Label htmlFor="marketing">
                          Receive marketing emails
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch id="notifications" />
                        <Label htmlFor="notifications">
                          Enable notifications
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch id="dark" defaultChecked />
                        <Label htmlFor="dark">Dark mode</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Radio Group
                    </h3>
                    <RadioGroup defaultValue="option-1">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="option-1" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="option-2" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="option-3" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Toggle Group
                    </h3>
                    <ToggleGroup type="multiple">
                      <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <Bold className="size-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="italic"
                        aria-label="Toggle italic"
                      >
                        <Italic className="size-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="underline"
                        aria-label="Toggle underline"
                      >
                        <Underline className="size-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Toggle
                    </h3>
                    <div className="flex gap-2">
                      <Toggle aria-label="Toggle italic">
                        <Italic className="size-4" />
                      </Toggle>
                      <Toggle variant="outline" aria-label="Toggle bold">
                        <Bold className="size-4" />
                      </Toggle>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* ==================== SLIDER & PROGRESS ==================== */}
            <section id="slider-progress">
              <h2 className="text-2xl font-semibold mb-2">Slider & Progress</h2>
              <p className="text-muted-foreground mb-6">
                Range inputs and progress indicators.
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Slider
                  </h3>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Value: {sliderValue[0]}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Progress
                  </h3>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {progress}% complete
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* ==================== INPUT OTP ==================== */}
            <section id="input-otp">
              <h2 className="text-2xl font-semibold mb-2">Input OTP</h2>
              <p className="text-muted-foreground mb-6">
                One-time password input fields.
              </p>

              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </section>

            <Separator />

            {/* ==================== CALENDAR ==================== */}
            <section id="calendar">
              <h2 className="text-2xl font-semibold mb-2">Calendar</h2>
              <p className="text-muted-foreground mb-6">
                Date selection component.
              </p>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </section>

            <Separator />

            {/* ==================== ACCORDION ==================== */}
            <section id="accordion">
              <h2 className="text-2xl font-semibold mb-2">Accordion</h2>
              <p className="text-muted-foreground mb-6">
                Collapsible content sections.
              </p>

              <Accordion type="single" collapsible className="w-full max-w-xl">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match your theme.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default with smooth transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <Separator />

            {/* ==================== COLLAPSIBLE ==================== */}
            <section id="collapsible">
              <h2 className="text-2xl font-semibold mb-2">Collapsible</h2>
              <p className="text-muted-foreground mb-6">
                Expandable content container.
              </p>

              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
                className="w-full max-w-md"
              >
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h4 className="text-sm font-semibold">
                    @peduarte starred 3 repositories
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="text" size="sm">
                      <ChevronsUpDown className="size-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm mt-2">
                  @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2 mt-2">
                  <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/colors
                  </div>
                  <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @stitches/react
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </section>

            <Separator />

            {/* ==================== TABS ==================== */}
            <section id="tabs">
              <h2 className="text-2xl font-semibold mb-2">Tabs</h2>
              <p className="text-muted-foreground mb-6">
                Tabbed navigation interface.
              </p>

              <Tabs defaultValue="account" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            <Separator />

            {/* ==================== TABLE ==================== */}
            <section id="table">
              <h2 className="text-2xl font-semibold mb-2">Table</h2>
              <p className="text-muted-foreground mb-6">
                Data table with headers and rows.
              </p>

              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>
                        <Badge variant="outline">Paid</Badge>
                      </TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV002</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell>PayPal</TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV003</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Unpaid</Badge>
                      </TableCell>
                      <TableCell>Bank Transfer</TableCell>
                      <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <Separator />

            {/* ==================== PAGINATION ==================== */}
            <section id="pagination">
              <h2 className="text-2xl font-semibold mb-2">Pagination</h2>
              <p className="text-muted-foreground mb-6">
                Navigate through pages of content.
              </p>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>

            <Separator />

            {/* ==================== SKELETON ==================== */}
            <section id="skeleton">
              <h2 className="text-2xl font-semibold mb-2">Skeleton</h2>
              <p className="text-muted-foreground mb-6">
                Loading placeholder animation.
              </p>

              <div className="flex items-center space-x-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </section>

            <Separator />

            {/* ==================== SPINNER ==================== */}
            <section id="spinner">
              <h2 className="text-2xl font-semibold mb-2">Spinner</h2>
              <p className="text-muted-foreground mb-6">Loading indicator.</p>

              <div className="flex gap-4 items-center">
                <Spinner className="size-4" />
                <Spinner className="size-6" />
                <Spinner className="size-8" />
                <Button disabled>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Please wait
                </Button>
              </div>
            </section>

            <Separator />

            {/* ==================== KEYBOARD SHORTCUTS ==================== */}
            <section id="kbd">
              <h2 className="text-2xl font-semibold mb-2">
                Keyboard Shortcuts
              </h2>
              <p className="text-muted-foreground mb-6">
                Display keyboard shortcuts.
              </p>

              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                  <span className="text-sm text-muted-foreground">
                    Open command
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Kbd>⌘</Kbd>
                  <Kbd>S</Kbd>
                  <span className="text-sm text-muted-foreground">Save</span>
                </div>
                <div className="flex items-center gap-2">
                  <Kbd>Ctrl</Kbd>
                  <Kbd>Shift</Kbd>
                  <Kbd>P</Kbd>
                  <span className="text-sm text-muted-foreground">
                    Command palette
                  </span>
                </div>
              </div>
            </section>

            <Separator />

            {/* ==================== COMMAND ==================== */}
            <section id="command">
              <h2 className="text-2xl font-semibold mb-2">Command</h2>
              <p className="text-muted-foreground mb-6">
                Command palette / search interface.
              </p>

              <Command className="rounded-lg border shadow-md max-w-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <CalendarIcon className="mr-2 size-4" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Search className="mr-2 size-4" />
                      <span>Search</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 size-4" />
                      <span>Settings</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <User className="mr-2 size-4" />
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CreditCard className="mr-2 size-4" />
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </section>

            <Separator />

            {/* ==================== DIALOGS & OVERLAYS ==================== */}
            <section id="dialogs">
              <h2 className="text-2xl font-semibold mb-2">
                Dialogs & Overlays
              </h2>
              <p className="text-muted-foreground mb-6">
                Modal dialogs, sheets, drawers, and popovers.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outlined">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dialog-name">Name</Label>
                        <Input id="dialog-name" defaultValue="Pedro Duarte" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outlined" buttonType="error">
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outlined">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input defaultValue="Pedro Duarte" />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button>Save changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                {/* Drawer */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outlined">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Move Goal</DrawerTitle>
                      <DrawerDescription>
                        Set your daily activity goal.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outlined"
                          size="icon"
                          onClick={() =>
                            setProgress(Math.max(0, progress - 10))
                          }
                        >
                          -
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-6xl font-bold tracking-tighter">
                            {progress}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            Goals/day
                          </div>
                        </div>
                        <Button
                          variant="outlined"
                          size="icon"
                          onClick={() =>
                            setProgress(Math.min(100, progress + 10))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild>
                        <Button variant="outlined">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                {/* Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outlined">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label>Width</Label>
                          <Input
                            defaultValue="100%"
                            className="col-span-2 h-8"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Hover Card */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="text">@nextjs</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                          The React Framework – created by @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 size-4 opacity-70" />
                          <span className="text-xs text-muted-foreground">
                            Joined December 2021
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Toast */}
                <Button
                  variant="outlined"
                  onClick={() => toast.success("Event has been created")}
                >
                  Show Toast
                </Button>
              </div>
            </section>

            <Separator />

            {/* ==================== DROPDOWN & CONTEXT MENU ==================== */}
            <section id="menus">
              <h2 className="text-2xl font-semibold mb-2">Menus</h2>
              <p className="text-muted-foreground mb-6">
                Dropdown and context menus.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outlined">Open Dropdown</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 size-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 size-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 size-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 size-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Context Menu */}
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                    Right click here
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem>
                      <ArrowUpIcon className="mr-2 size-4" />
                      Back
                    </ContextMenuItem>
                    <ContextMenuItem disabled>Forward</ContextMenuItem>
                    <ContextMenuItem>Reload</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                      <ContextMenuSubContent className="w-48">
                        <ContextMenuItem>Save Page As...</ContextMenuItem>
                        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                        <ContextMenuItem>Name Window...</ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </section>

            <Separator />

            {/* ==================== TOOLTIP ==================== */}
            <section id="tooltip">
              <h2 className="text-2xl font-semibold mb-2">Tooltip</h2>
              <p className="text-muted-foreground mb-6">
                Informative popup on hover.
              </p>

              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outlined" size="icon">
                      <Plus className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outlined" size="icon">
                      <Settings className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outlined" size="icon">
                      <User className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Profile</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </section>

            <Separator />

            {/* ==================== RESIZABLE ==================== */}
            <section id="resizable">
              <h2 className="text-2xl font-semibold mb-2">Resizable</h2>
              <p className="text-muted-foreground mb-6">
                Resizable panel groups.
              </p>

              <ResizablePanelGroup
                direction="horizontal"
                className="max-w-2xl rounded-lg border"
              >
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-[200px] items-center justify-center p-6">
                    <span className="font-semibold">Panel One</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Panel Two</span>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Panel Three</span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </section>

            <Separator />

            {/* ==================== SCROLL AREA ==================== */}
            <section id="scroll-area">
              <h2 className="text-2xl font-semibold mb-2">Scroll Area</h2>
              <p className="text-muted-foreground mb-6">
                Custom scrollable container.
              </p>

              <ScrollArea className="h-72 w-48 rounded-md border">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    Tags
                  </h4>
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="text-sm py-2">
                      Tag {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </section>

            <Separator />

            {/* ==================== EMPTY STATE ==================== */}
            <section id="empty">
              <h2 className="text-2xl font-semibold mb-2">Empty State</h2>
              <p className="text-muted-foreground mb-6">
                Placeholder for empty content.
              </p>

              <div className="max-w-md mx-auto">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FolderCode className="size-10 text-muted-foreground" />
                    </EmptyMedia>
                    <EmptyTitle>No Projects Yet</EmptyTitle>
                    <EmptyDescription>
                      You haven't created any projects yet. Get started by
                      creating your first project.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <div className="flex gap-3 justify-center">
                      <Button>Create Project</Button>
                      <Button variant="outlined">Import</Button>
                    </div>
                  </EmptyContent>
                </Empty>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-16">
          <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
            <p>
              © 2024 Ghanshyam UI. Built with React, Radix UI & Tailwind CSS.
            </p>
            <p className="text-sm mt-2">50+ Components Showcased</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;

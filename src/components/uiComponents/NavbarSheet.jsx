import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { AlignJustify } from "lucide-react";
  
  function NavbarSheet() {
    return (
      <div className="h-fit">
        <Sheet>
          <SheetTrigger className="flex items-center justify-center"><AlignJustify size={25} className="mt-1"/></SheetTrigger>
          <SheetContent className="w-full max-w-[400px] sm:w-[540px]" side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
  
  export default NavbarSheet;
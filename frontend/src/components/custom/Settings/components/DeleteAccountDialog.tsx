"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Trash2 } from "lucide-react";
import { deleteAccount, verifyAuth } from "@/components/services/auth.service"; // ✅ your service imported
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userProfilePayloadType } from "../../../../../types/updateProfileResponse";

export default function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
   const [userData, setUserData] = useState<userProfilePayloadType| null>(null)

   useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await verifyAuth();
          if (response?.status === "success" && response?.data) {
            const data = response?.data;
            setUserData(data);
          }
        } catch (error) {
          toast.error("Failed to load profile data");
        }
      };
      fetchUserProfile();
    }, []);

  
  const router = useRouter();

  const accountName = userData?.name;

  const handleDelete = async () => {
    console.log("Delete button clicked");

    // If account name doesn't match, show error and return early
    if (confirmText !== accountName) {
      toast.error("Account name doesn't match");
      return;
    }

    setIsDeleting(true);
    console.log("Attempting to delete");

    try {
      await deleteAccount(); // Call the deleteAccount service function
      toast.success("Account deleted successfully");
      router.push("/signup");
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast.error("Error deleting your account");
    } finally {
      // Always reset isDeleting after the operation (success or failure)
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-4 shadow-md">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Permanently delete your account and all of your data.</CardDescription>
        </CardHeader>

        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This action cannot be undone. All of your data will be permanently removed.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-destructive">Delete Account</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="bg-muted p-3 rounded-md border border-border">
                  <p className="text-sm font-medium">
                    To confirm, please type your account name:{" "}
                    <span className="font-bold">{accountName}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmDelete" className="font-bold">
                    Confirm account name
                  </Label>
                  <Input
                    id="confirmDelete"
                    placeholder="Enter your account name"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className={confirmText && confirmText !== accountName ? "border-destructive" : ""}
                  />
                  {confirmText && confirmText !== accountName && (
                    <p className="text-xs text-destructive">Account name doesn't match</p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={confirmText !== accountName || isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}

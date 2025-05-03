import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Briefcase, FileText, MapPin, Settings, ShieldCheck, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { UserProfileApiResponse, userProfilePayloadType } from "../../../../../../types/updateProfileResponse"

interface PersonalInformationProps {
  adminProfile: userProfilePayloadType | null;
}


export const AdminSidebar: React.FC<PersonalInformationProps> = ({ adminProfile }) => {
  const router = useRouter();

  const userplaceholder = adminProfile?.name.split(" ").map((n) => n[0]).join("");
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 bg-blue-600 mb-4">
            <AvatarImage src={adminProfile?.profilePicture} alt="Admin Avatar" />
            <AvatarFallback className="text-2xl text-white">
              {userplaceholder}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold">{adminProfile?.name}</h2>
          <p className="text-muted-foreground">{adminProfile?.email}</p>
        </div>
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-4 py-2 rounded-xl shadow-md animate-fade-in">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-lg tracking-wide">Welcome to <span className="text-blue-900 font-bold">CareerView</span></span>
          </div>


        </div>

        <div className="space-y-2 mb-6 mt-3">
          <div className="flex items-center gap-2 p-1 text-gray-700">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span>{adminProfile?.location}</span>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            <span>Administrator</span>
          </div>

          <div onClick={() => router.push("/admin/settings")} className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span>System Settings</span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="mb-6">
          <h3 className="font-medium mb-3">Permissions</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Manage Users</Badge>
            <Badge variant="secondary">Review Courses</Badge>
            <Badge variant="secondary">Access Reports</Badge>
            <Badge variant="secondary">Moderate Content</Badge>
          </div>
        </div>

        {/* <Separator className="my-6" />
  
          <div>
            <h3 className="font-medium mb-3">Admin Docs</h3>
            <div className="border rounded-md p-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">admin_policy.pdf</p>
                  <p className="text-sm text-muted-foreground">Uploaded: 2024-04-01</p>
                </div>
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div> */}
      </CardContent>
    </Card>
  )
}
export  function getBadgeClass(status: string) {
    switch (status) {
      case "Active":
        return "bg-green-500 hover:bg-green-600";
      case "Inactive":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-yellow-500 hover:bg-yellow-600"; // for "Pending" or any other status
    }
  }
  
  export function getJobStatusBadgeClass(status: string) {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400";
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";
      case "interview-schedule":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300";
    }
  }
  
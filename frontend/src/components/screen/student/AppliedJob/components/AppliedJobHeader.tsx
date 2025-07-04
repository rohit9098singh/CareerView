import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, RotateCcw } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface AppliedJobHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string;
  setSortBy: (sort: string) => void
}

const AppliedJobHeader: FC<AppliedJobHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setSortBy,
  sortBy
}) => {
  

  const handleReset = () => {
    setSearchQuery("")
    setSortBy("")
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>Your Applied Jobs</h1>
        <p className='text-muted-foreground'>Track and manage all your job applications in one place.</p>
      </div>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search your applications'
            className='pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='flex gap-3'>
        <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full h-11 font-semibold">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateDesc">Date (Newest first)</SelectItem>
              <SelectItem value="dateAsc">Date (Oldest first)</SelectItem>
              <SelectItem value="companyAsc">Company (A-Z)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" title="Reset filters" onClick={handleReset}>
            <RotateCcw className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppliedJobHeader

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, RotateCcw, Briefcase } from 'lucide-react'
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
      <div className='mb-12'>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          <Briefcase className="h-3 w-3" />
          <span>Application Tracking</span>
        </div>
        <h1 className='text-5xl font-black text-foreground mb-4 tracking-tight italic'>Your Applied Jobs</h1>
        <p className='text-muted-foreground text-lg font-medium max-w-2xl'>
          Easily track the status of all your applications and stay updated on your career journey.
        </p>
      </div>

      <div className='bg-background p-8 rounded-3xl shadow-xl border border-primary/5 mb-8'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center'>
          <div className='relative flex-1 group'>
            <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors' />
            <Input
              placeholder='Search applications by title, company, or status...'
              className='pl-12 h-14 border-secondary text-lg focus:border-primary/30 transition-all rounded-2xl'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='flex flex-wrap items-center gap-4 border-t lg:border-t-0 lg:border-l border-secondary pt-6 lg:pt-0 lg:pl-6'>
            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[240px] h-11 font-bold border-secondary bg-secondary/10 hover:bg-secondary/20 transition-colors">
                  <SelectValue placeholder="Latest Applied" />
                </SelectTrigger>
                <SelectContent className="font-bold">
                  <SelectItem value="dateDesc">Date: Newest first</SelectItem>
                  <SelectItem value="dateAsc">Date: Oldest first</SelectItem>
                  <SelectItem value="companyAsc">Company: A-Z</SelectItem>
                  <SelectItem value="status">Application Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              className='flex items-center justify-center gap-2 h-11 font-bold text-muted-foreground hover:text-primary'
              onClick={handleReset}
            >
              <RotateCcw className='h-4 w-4' />
              <span>Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppliedJobHeader

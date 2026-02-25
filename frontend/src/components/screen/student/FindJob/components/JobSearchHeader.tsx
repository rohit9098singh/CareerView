import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCcw, SearchIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react'

interface JobSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const JobSearchHeader: React.FC<JobSearchHeaderProps> = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("searching for:", searchQuery)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSortBy("")
  }

  return (
    <div className='mb-12'>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
        <SearchIcon className="h-3 w-3" />
        <span>Discover Opportunities</span>
      </div>
      <h1 className='text-5xl font-black text-foreground mb-4 tracking-tight italic'>Find the Perfect Job</h1>
      <p className='text-muted-foreground text-lg font-medium max-w-2xl'>
        Browse through hundreds of high-quality opportunities tailored for students and graduates.
      </p>

      <div className='bg-background p-8 rounded-3xl shadow-xl border border-primary/5 mt-8'>
        <form onSubmit={handleSearch} className='space-y-6'>

          <div className='flex flex-col sm:flex-row items-stretch gap-4'>
            <div className='relative flex-grow'>
              <SearchIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5' />
              <Input
                type='text'
                placeholder='Search by job title, company, or location...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-12 h-14 border-secondary text-lg focus:border-primary/30 transition-all rounded-2xl'
              />
            </div>
            <Button
              type='submit'
              className='h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 rounded-2xl'
            >
              Search Jobs
            </Button>
          </div>

          <div className='flex flex-wrap items-center gap-4 pt-2 border-t border-secondary'>
            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[220px] h-11 font-bold border-secondary bg-secondary/10 hover:bg-secondary/20 transition-colors">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent className="font-bold">
                  <SelectItem value="salary_high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary_low">Salary: Low to High</SelectItem>
                  <SelectItem value="deadline">Application Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='w-full sm:w-auto ml-auto'>
              <Button
                variant="ghost"
                className='flex items-center justify-center gap-2 w-full h-11 font-bold text-muted-foreground hover:text-primary'
                onClick={handleReset}
              >
                <RotateCcw className='h-4 w-4' />
                Clear Filters
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default JobSearchHeader

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, RotateCcw, SearchIcon, SortAsc } from 'lucide-react'
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
    <div className='mb-10'>
      <h1 className='text-4xl font-bold text-gray-900 mb-2'>Find the Perfect Job</h1>
      <p className='text-gray-600 text-base mb-6'>
        Browse through hundreds of opportunities tailored for students.
      </p>

      <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
        <form onSubmit={handleSearch} className='space-y-4'>

          <div className='flex flex-col sm:flex-row items-stretch gap-3'>
            <div className='relative flex-grow'>
              <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                type='text'
                placeholder='Search jobs, companies, or keywords...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 h-11'
              />
            </div>
            <Button
              type='submit'
              className='bg-purple-600 hover:bg-purple-700 text-white h-11 px-6'
            >
              Search
            </Button>
          </div>

          <div className='flex gap-3 w-full'>
            <div className='w-full sm:w-auto'>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full h-11 font-semibold">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary_high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary_low">Salary: Low to High</SelectItem>
                  <SelectItem value="deadline">Application Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='w-full sm:w-auto'>
              <Button variant="outline" className='flex items-center justify-center gap-2 w-full' onClick={handleReset}>
                <RotateCcw className='h-4 w-4' />
                Reset
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default JobSearchHeader

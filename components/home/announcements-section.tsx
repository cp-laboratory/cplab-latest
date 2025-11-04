"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, FileText } from "lucide-react"

interface Announcement {
  id: string
  title: string
  description: string
  link?: string
  pdfUrl?: string
  date: string
}

interface AnnouncementsSectionProps {
  announcements: Announcement[]
}

export default function AnnouncementsSection({ announcements }: AnnouncementsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Show 5 announcements per page

  // Sort announcements by date (latest first)
  const sortedAnnouncements = [...announcements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Paginate announcements
  const totalPages = Math.ceil(sortedAnnouncements.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAnnouncements = sortedAnnouncements.slice(startIndex, endIndex)

  // Group current page announcements by year and month
  const groupedAnnouncements = currentAnnouncements.reduce((acc, announcement) => {
    const date = new Date(announcement.date)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' })
    
    if (!acc[year]) {
      acc[year] = {}
    }
    if (!acc[year][month]) {
      acc[year][month] = []
    }
    acc[year][month].push(announcement)
    
    return acc
  }, {} as Record<number, Record<string, Announcement[]>>)

  // Flatten grouped announcements for display
  const displayGroups = Object.entries(groupedAnnouncements)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .flatMap(([year, months]) => 
      Object.entries(months)
        .sort((a, b) => {
          const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          return monthOrder.indexOf(b[0]) - monthOrder.indexOf(a[0])
        })
        .map(([month, items]) => ({ year: Number(year), month, items }))
    )

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>

      {/* Background blur effects */}
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <div className="z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border-primary/40 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 uppercase">
            <span>📢</span>
            <span className="text-sm">Announcements</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-6 max-w-xl text-center text-4xl font-medium md:text-[54px] md:leading-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Latest{" "} */}
          <span className="bg-gradient-to-b from-foreground via-blue-200 to-primary bg-clip-text text-transparent">
            Notices
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Stay informed about our latest achievements, events, and important announcements
        </motion.p>

        {/* Announcements List */}
        <div className="mx-auto mt-12 max-w-4xl">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No announcements available.</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {displayGroups.map((group, groupIndex) => (
                    <motion.div
                      key={`${group.year}-${group.month}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      {/* Year/Month Header */}
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-primary/20 to-transparent h-px flex-1"></div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {group.month} {group.year}
                        </h3>
                        <div className="bg-gradient-to-l from-primary/20 to-transparent h-px flex-1"></div>
                      </div>

                      {/* Announcements for this month */}
                      <div className="space-y-3">
                        {group.items.map((announcement, index) => (
                          <motion.div
                            key={announcement.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.01 }}
                            className="from-secondary/40 to-secondary/10 group relative rounded-xl border border-white/10 bg-gradient-to-b p-5 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {announcement.title}
                                  </h4>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(announcement.date).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {announcement.description}
                                </p>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 flex-shrink-0">
                                {announcement.link && (
                                  <a
                                    href={announcement.link}
                                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                                    title="View details"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                {announcement.pdfUrl && (
                                  <a
                                    href={announcement.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                                    title="Download PDF"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FileText className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex justify-center items-center gap-2 mt-12"
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-card/50 border border-border/30 text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card/80 hover:border-primary/50 transition-all disabled:hover:bg-card/50 disabled:hover:border-border/30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg transition-all ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "bg-card/50 border border-border/30 text-muted-foreground hover:bg-card/80 hover:border-primary/50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-muted-foreground flex items-center">
                            ...
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-card/50 border border-border/30 text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card/80 hover:border-primary/50 transition-all disabled:hover:bg-card/50 disabled:hover:border-border/30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

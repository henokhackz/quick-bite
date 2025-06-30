import React from "react";
import Announcements from "@/components/charts/announcement";
import { Megaphone } from "lucide-react";

const AnnouncementsPage = () => {
  return (
    <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-12 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Megaphone className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-semibold">Announcements</h1>
          </div>
          {/* Optional: Add button for admins to create new announcement */}
          {/* <button className="btn btn-primary">Create Announcement</button> */}
        </div>

        {/* Announcements Section */}
        <div className="rounded-xl border border-muted p-4 bg-muted/30 shadow-sm">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;

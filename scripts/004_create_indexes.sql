-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hazard_reports_location ON public.hazard_reports (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_type ON public.hazard_reports (hazard_type);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_severity ON public.hazard_reports (severity);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_status ON public.hazard_reports (status);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_created_at ON public.hazard_reports (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_user_id ON public.hazard_reports (user_id);

CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON public.social_media_posts (platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_posted_at ON public.social_media_posts (posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_location ON public.social_media_posts (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_comments_report_id ON public.comments (report_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments (user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments (created_at DESC);

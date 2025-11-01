-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Hazard reports policies
CREATE POLICY "reports_select_all" ON public.hazard_reports
  FOR SELECT USING (true); -- All users can view reports

CREATE POLICY "reports_insert_own" ON public.hazard_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reports_update_own" ON public.hazard_reports
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "reports_delete_own" ON public.hazard_reports
  FOR DELETE USING (auth.uid() = user_id);

-- Admin users can update any report status
CREATE POLICY "reports_admin_update" ON public.hazard_reports
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Social media posts policies (admin/moderator access only)
CREATE POLICY "social_posts_admin_select" ON public.social_media_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "social_posts_admin_all" ON public.social_media_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Comments policies
CREATE POLICY "comments_select_all" ON public.comments
  FOR SELECT USING (true); -- All users can view comments

CREATE POLICY "comments_insert_own" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_update_own" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "comments_delete_own" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types for the FS based structure
export interface FSLesson {
  slug: string; // The filename without extension
  title: string;
  description: string;
  duration: string;
  path: string; // Relative path for debugging
}

export interface FSChapter {
  id: string; // folder name e.g "01-foundation"
  title: string;
  lessons: FSLesson[];
}

export interface FSCourse {
  trackId: string;
  chapters: FSChapter[];
}

const EDUCATION_DIR = path.join(process.cwd(), 'content', 'education');

export function getCourseStructure(trackId: string): FSCourse | null {
  const trackPath = path.join(EDUCATION_DIR, trackId);
  
  if (!fs.existsSync(trackPath)) {
    return null;
  }

  // 1. Get Chapters (Folders starting with number)
  const chapters = fs.readdirSync(trackPath)
    .filter(file => {
      const stats = fs.statSync(path.join(trackPath, file));
      return stats.isDirectory() && /^\d+-.+/.test(file); // expecting format "01-chapter-name"
    })
    .sort()
    .map(folderName => {
      const chapterPath = path.join(trackPath, folderName);
      
      // Parse Chapter Title from folder name (01-foundation -> Foundation)
      // Or we could read a meta.json if we wanted rich titles, but let's format the name for now.
      const rawName = folderName.replace(/^\d+-/, '').replace(/-/g, ' ');
      // Capitalize
      const title = rawName.charAt(0).toUpperCase() + rawName.slice(1);

      // 2. Get Lessons (MDX files)
      const lessons = fs.readdirSync(chapterPath)
        .filter(file => file.endsWith('.mdx'))
        .sort() // Sort by filename (user should name files like 01-intro.mdx for ordering)
        .map(fileName => {
          const filePath = path.join(chapterPath, fileName);
          const source = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(source);

          return {
            slug: fileName.replace(/\.mdx$/, ''), // This will be the ID
            title: data.title || fileName.replace(/\.mdx$/, ''),
            description: data.desc || "",
            duration: data.readTime || "5 min",
            path: path.join(folderName, fileName)
          };
        });

      return {
        id: folderName,
        title: title, // You might want to override this with a map if needed
        lessons
      };
    });

  return {
    trackId,
    chapters
  };
}

// Helper to find absolute path of a lesson by slug (since it's nested now)
// Returns { chapterId, content }
export function getLessonBySlug(trackId: string, lessonSlug: string) {
  const course = getCourseStructure(trackId);
  if (!course) return null;

  for (const chapter of course.chapters) {
    const lesson = chapter.lessons.find(l => l.slug === lessonSlug);
    if (lesson) {
      const fullPath = path.join(EDUCATION_DIR, trackId, lesson.path);
      const source = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(source);
      return {
        frontmatter: data,
        content,
        chapter
      };
    }
  }
  return null;
}

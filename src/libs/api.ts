export const getTags = async (locale: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/tags/?lang=${locale}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }

  return response.json();
};

export const getTestimonial = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/testimonials/`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch testimonial');
  }

  return response.json();
};

// API for course
export const getCourses = async (
  searchText: string = '',
  superSearch: string = '',
  service: string = '',
  location: string = '',
  body: string = '',
  expertise: string = '',
  locale: string = '',
  page: number = 1,
  pageSize: number = 12,
  ordering: string = '',
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/academy/courses/?search=${searchText}&superSearch=${superSearch}&category__name=${service}&location=${location}&body=${body}&expertise=${expertise}&page=${page}&page_size=${pageSize}&ordering=${ordering}&lang=${locale}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return response.json();
};

export const singleCourse = async (courseSlug: string, locale: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/academy/courses/${courseSlug}?lang=${locale}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }

  return response.json();
};

export const getInstructors = async (locale: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/academy/instructors/?lang=${locale}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }

  return response.json();
};

export const getCategory = async (locale: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/academy/categories/?lang=${locale}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }

  return response.json();
};

export const getExpertise = async (limit: number, locale: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/academy/area-of-expertise-list/?page_size=${limit}&lang=${locale}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch expertise');
  }

  return response.json();
};

// For blog
export const getBlogs = async (
  locale: string,
  tagName: string = '',
  searchText: string = '',
  page: number = 1,
  pageSize: number = 12,
) => {
  const currentLocale = locale;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/posts/?tags__name=${tagName}&search=${searchText}&page=${page}&page_size=${pageSize}&lang=${currentLocale}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }

  return response.json();
};

export const singleBlog = async (locale: string, postSlug: string) => {
  const currentLocale = locale;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/posts/${postSlug}/?lang=${currentLocale}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }

  return response.json();
};

export const getImageByCategory = async (imageCategory: string = '') => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/images/?category=${imageCategory}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  return response.json();
};

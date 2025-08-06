interface ValidationError {
  field: string;
  message: string;
}

export const validateBlog = (blog: {
  title: string;
  body: string;
  tags?: string[];
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Title validation
  if (!blog.title) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  // Body validation
  if (!blog.body) {
    errors.push({ field: 'body', message: 'Content is required' });
  }
  if (blog.body.length < 250) {
    errors.push({ field: 'body', message: 'Content must be at least 250 characters long' });
  }

  // Tags validation
  if (blog.tags) {
    blog.tags.forEach((tag) => {
      if (tag.length > 30) {
        errors.push({
          field: 'tags',
          message: `Tag "${tag}" exceeds the maximum length of 30 characters`,
        });
      }
    });
  }

  return errors;
};

export const validateUser = (user: {
  email: string;
  password: string;
  name?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Email validation
  if (!user.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  // Password validation
  if (!user.password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (user.password.length < 6) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 6 characters long',
    });
  }

  // Name validation (for registration)
  if (user.name !== undefined && !user.name) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  return errors;
};

export const showValidationErrors = (errors: ValidationError[]): string => {
  return errors.map(error => `${error.field}: ${error.message}`).join('\n');
};

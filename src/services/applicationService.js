const STORAGE_KEY = "jobtrack-applications";

export const applicationService = {
  getApplications() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        resolve(
          saved
            ? JSON.parse(saved)
            : []
        );
      }, 800);
    });
  },

  saveApplications(applications) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(applications)
        );

        resolve(applications);
      }, 300);
    });
  },
};
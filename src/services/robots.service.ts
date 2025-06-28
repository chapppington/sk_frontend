class RobotsService {
  async getRobotsContent(): Promise<{
    success: boolean;
    content?: string;
    message?: string;
  }> {
    try {
      const response = await fetch("/client_api/robots", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error reading robots.txt:", error);
      return {
        success: false,
        message: "Failed to read robots.txt",
      };
    }
  }

  async updateRobotsContent(content: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const response = await fetch("/client_api/robots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating robots.txt:", error);
      return {
        success: false,
        message: "Failed to update robots.txt",
      };
    }
  }
}

export default new RobotsService();

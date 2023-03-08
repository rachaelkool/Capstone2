import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class DashboardApi {
    // the token for interactive with the API will be stored here.
    static token;
  
    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
  
      //there are multiple ways to pass an authorization token, this is how you pass it in the header.
      //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
      const url = `${BASE_URL}/${endpoint}`;
    //   const headers = { Authorization: `Bearer ${DashboardApi.token}` };
      const params = (method === "get")
          ? data
          : {};

      const headers = {authorization: DashboardApi.token}
  
      try {
        return (await axios({ url, headers, method, data, params })).data;
      } catch (err) {
        console.error("API Error:", err.response);
        // let message = err.response.data.error.message;
        // throw Array.isArray(message) ? message : [message];
      }
    }
  
    // Individual API routes

  
    static async getNotes() {
      let res = await this.request(`notes`);
      return res.notes;
    }

    static async getNote(id) {
      let res = await this.request(`notes/${id}`);
      return res.note;
    }

    static async createNote(data) {
      let res = await this.request(`notes`, data, "post");
      return res.note;
    }

    static async updateNote(id, data) {
      let res = await this.request(`notes/${id}`, data, "patch");
      return res.note;
    }

    static async deleteNote(id) {
      await this.request(`notes/${id}`, id, "delete");
    }

    static async deleteIncident(id) {
      await this.request(`incidents/${id}`, id, "delete");
    }

    static async getIncidents() {
      let res = await this.request(`incidents`);
      return res.incidents;
    }

    static async createIncident(data) {
      let res = await this.request(`incidents`, data, "post");
      return res.incident;
    }

    static async getIncident(id) {
      let res = await this.request(`incidents/${id}`);
      return res.incident;
    }

    static async updateIncident(id, data) {
      let res = await this.request(`incidents/${id}`, data, "patch");
      return res.incident;
    }

    static async getAttendanceReports() {
      let res = await this.request(`attendance`);
      return res.attendance_reports;
    }

    static async createAttendanceReport(data) {
      let res = await this.request(`attendance`, data, "post");
      return res.attendance_report;
    }

    static async getAttendanceReport(id) {
      let res = await this.request(`attendance/${id}`);
      return res.attendance_report;
    }

    static async updateAttendanceReport(id, data) {
      let res = await this.request(`attendance/${id}`, data, "patch");
      return res.attendance_report;
    }

    static async deleteAttendanceReport(id) {
      await this.request(`attendance/${id}`, id, "delete");
    }

    static async getTips() {
      let res = await this.request(`tips`);
      return res.tips;
    }

    static async createTip(data) {
      let res = await this.request(`tips`, data, "post");
      return res.tip;
    }

    static async getTip(id) {
      let res = await this.request(`tips/${id}`);
      return res.tip;
    }

    static async updateTip(id, data) {
      let res = await this.request(`tips/${id}`, data, "patch");
      return res.tip;
    }

    static async deleteTip(id) {
      await this.request(`tips/${id}`, id, "delete");
    }

    static async login(data) {
      let res = await this.request(`auth/token`, data, "post");
      return res.token;
    }

    static async signup(data) {
      let res = await this.request(`auth/register`, data, "post");
      return res.token;
    }

    static async getCurrentEmployee(empId) {
      let res = await this.request(`employees/${empId}`);
      return res.employee;
    }

    static async updateProfile(empId, data) {
      let res = await this.request(`employees/${empId}`, data, "patch");
      return res.employee;
    }
    
  
  }
  
  // for now, put token ("testuser" / "password" on class)
DashboardApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
      "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
      "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  
  
  export default DashboardApi;
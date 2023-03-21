import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


class DashboardApi {
    static token;
  
    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
  
      const url = `${BASE_URL}/${endpoint}`;
      const params = (method === "get") ? data : {};
      const headers = {authorization: DashboardApi.token}
  
      try {
        return (await axios({ url, headers, method, data, params })).data;
      } catch (err) {
        console.error("API Error:", err.response);
      }
    }
  
    static async getNotes() {
      let res = await this.request(`api/notes`);
      return res.notes;
    }

    static async getNote(id) {
      let res = await this.request(`api/notes/${id}`);
      return res.note;
    }

    static async createNote(data) {
      let res = await this.request(`api/notes`, data, "post");
      return res.note;
    }

    static async updateNote(id, data) {
      let res = await this.request(`api/notes/${id}`, data, "patch");
      return res.note;
    }

    static async deleteNote(id) {
      await this.request(`api/notes/${id}`, id, "delete");
    }

    static async deleteIncident(id) {
      await this.request(`api/incidents/${id}`, id, "delete");
    }

    static async getIncidents() {
      let res = await this.request(`api/incidents`);
      return res.incidents;
    }

    static async createIncident(data) {
      let res = await this.request(`api/incidents`, data, "post");
      return res.incident;
    }

    static async getIncident(id) {
      let res = await this.request(`api/incidents/${id}`);
      return res.incident;
    }

    static async updateIncident(id, data) {
      let res = await this.request(`api/incidents/${id}`, data, "patch");
      return res.incident;
    }

    static async getAttendanceReports() {
      let res = await this.request(`api/attendance`);
      return res.attendance_reports;
    }

    static async createAttendanceReport(data) {
      let res = await this.request(`api/attendance`, data, "post");
      return res.attendance_report;
    }

    static async getAttendanceReport(id) {
      let res = await this.request(`api/attendance/${id}`);
      return res.attendance_report;
    }

    static async updateAttendanceReport(id, data) {
      let res = await this.request(`api/attendance/${id}`, data, "patch");
      return res.attendance_report;
    }

    static async deleteAttendanceReport(id) {
      await this.request(`api/attendance/${id}`, id, "delete");
    }

    static async getTips() {
      let res = await this.request(`api/tips`);
      return res.tips;
    }

    static async createTip(data) {
      let res = await this.request(`api/tips`, data, "post");
      return res.tip;
    }

    static async getTip(id) {
      let res = await this.request(`api/tips/${id}`);
      return res.tip;
    }

    static async updateTip(id, data) {
      let res = await this.request(`api/tips/${id}`, data, "patch");
      return res.tip;
    }

    static async deleteTip(id) {
      await this.request(`api/tips/${id}`, id, "delete");
    }

    static async getStaffReports() {
      let res = await this.request(`api/staff`);
      return res.staff_reports;
    }

    static async createStaffReport(data) {
      let res = await this.request(`api/staff`, data, "post");
      return res.staff_report;
    }

    static async getStaffReport(id) {
      let res = await this.request(`api/staff/${id}`);
      return res.staff_report;
    }

    static async updateStaffReport(id, data) {
      let res = await this.request(`api/staff/${id}`, data, "patch");
      return res.staff_report;
    }

    static async deleteStaffReport(id) {
      await this.request(`api/staff/${id}`, id, "delete");
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

  
export default DashboardApi;
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
  
      try {
        return (await axios({ url, method, data, params })).data;
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
  
  }
  
  // for now, put token ("testuser" / "password" on class)
DashboardApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
      "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
      "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  
  
  export default DashboardApi;
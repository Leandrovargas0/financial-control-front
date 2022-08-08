
export default function headerAuthorization() {
    //if (process.browser)
    
    if (process.browser) {
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${  token}` };
        } 
    }
    return {};
  }
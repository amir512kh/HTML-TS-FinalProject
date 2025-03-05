import {onLoginFormSubmit} from "./controller.js";

export function login(form : HTMLFormElement, errorMessage : HTMLElement){
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let isLoginSucsessful = false;       
        const formData = new FormData(form, event.submitter) as any;

        try {
            isLoginSucsessful = onLoginFormSubmit(formData);
            form.reset();
        } catch (error) {
            console.error(error);
            console.log("show toast");
            displayToast(errorMessage, error);
        } 
        console.log("back from controller");
        console.log(`isLoginSucsessful = ${isLoginSucsessful}`);

        if (isLoginSucsessful) {
            window.location.href = "./index.html" 
        }
    });

}

function displayToast(container: HTMLElement, message: string){
           
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000); // Auto-hide after 3s
} 


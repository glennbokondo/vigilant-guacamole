import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent {
  constructor(public auth: AuthService) {}
  hide = true;
  form = { email: "", password: "" };
  email = new FormControl("", [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }
}

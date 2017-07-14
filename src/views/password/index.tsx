import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { default as PasswordComponent } from "~/components/password";

interface IPasswordState {
  password: string;
  firstName: string;
  lastName: string;
}

export class Password extends React.Component<RouteComponentProps<void>, IPasswordState> {
  public state: IPasswordState = {
    password: "",
    firstName: "",
    lastName: "",
  };

  private onValidPassword = (password: string) => {
    if (password === this.state.password)
      return;

    this.setState({
      password: password
    });
  }

  private onChange(field: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const addState = {
        [field]: event.target.value
      } as Pick<IPasswordState, "firstName" | "lastName">;
      this.setState(addState);
    };
  }

  public render() {
    const { firstName, lastName } = this.state;

    return (
      <div className="group">
        <section className="g-24 g-md-16 g-md-p-4 sudoku">
          <header>
            <h2>Password Strength Evaluation</h2>
          </header>
          <section>
            <p>Over the years, people have trained themselves to use passwords that are hard to remember for humans, but easy to guess for computers.</p>
            <p>
              A library called Zxcvbn addresses this issue by estimating how long it would take to crack a password, thus determening the strength of it. <br />
              The example below uses a TypeScript version of the Zxcvbn library, which I converted to TypeScript myself.
            </p>
            <div>
              It gives penalties to the password strength based on the following points;
              <ul>
                <li>Re-using user fields, in this case, first name and / or last name.</li>
                <li>Common English words.</li>
                <li>Patterns, such as '123321'.</li>
                <li>Commonly used passwords such as 'test123' or 'password123'.</li>
              </ul>
            </div>
          </section>
          <section className="password">
            <div className="g-24 g-lg-12 g-lg-p-6 g-md-16 g-md-p-4">
              <fieldset>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={this.onChange("firstName")}
                />
              </fieldset>
              <fieldset>
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={this.onChange("lastName")}
                />
              </fieldset>
              <PasswordComponent
                onValid={this.onValidPassword}
                inputs={[firstName, lastName]}
              />
            </div>
          </section>
        </section>
      </div>
    );
  }
}
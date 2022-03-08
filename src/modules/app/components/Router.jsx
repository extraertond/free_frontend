import React from "react";
import { Route, Switch } from "react-router";
import Creation from "../../questionnaires/components/creation/Creation";
import Edition from "../../questionnaires/components/creation/Edition";
import Questionnaire from "../../questionnaires/components/misc/Questionnaire";
import QuestionnairesHome from "../../questionnaires/components/misc/QuestionnairesHome";
import Revision from "../../questionnaires/components/revision/misc/Revision";
import { Logout, UserAdministration } from "../../users";
import UserData from "../../users/components/UserData";
import Home from "./Home";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/user" component={UserData} />
    <Route exact path="/user/admin" component={UserAdministration} />
    <Route exact path="/questionnaires" component={QuestionnairesHome} />
    <Route exact path="/questionnaire/:id" component={Questionnaire} />
    <Route exact path="/questionnaire/revision/:id" component={Revision} />
    <Route exact path="/questionnaire-creation" component={Creation} />
    <Route exact path="/questionnaire/edit/:id" component={Edition} />
    <Route exact path="/logout" component={Logout} />
  </Switch>
);

export default Router;

import { createReducer } from "@reduxjs/toolkit";
import actions from "./phonebook-actions";

const filter = createReducer("", {
  [actions.filterContacts]: (_, payload) => payload,
});

export default filter;

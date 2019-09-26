import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const postBook = (newBook, author, closeModal) => {
  return async dispatch => {
    console.log("Actions newbook:", newBook);
    try {
      const res = await instance.post("/api/books/", newBook);
      const book = res.data;
      dispatch(resetErrors());
      dispatch({
        type: actionTypes.POST_BOOK,
        payload: book
      });
      //   dispatch(filterBooks(""));
      closeModal();
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

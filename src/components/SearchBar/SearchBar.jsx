import { Field, Form, Formik, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.error("Please enter something");

export const SearchBar = ({ onSetSearchQuery }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { setSubmitting }) => {
        if (!values.query.trim()) {
          notify();
          setSubmitting(false);
          return;
        }
        onSetSearchQuery(values.query);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            placeholder="Search images and photos"
            type="text"
            name="query"
          />
          <ErrorMessage name="query" component="div" className="error" />
          <button type="submit" disabled={isSubmitting}>
            Search
          </button>
          <Toaster />
        </Form>
      )}
    </Formik>
  );
};

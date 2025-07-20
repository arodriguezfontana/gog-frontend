/* eslint-disable react/display-name */
// list.jsx
import "./list.css";
import React from "react";
// components
import PageSection from "../pageSection/pageSection";
const List = ({ children, title }) => {
  const header = React.Children.toArray(children).find(child => child.type === List.Header);
  const body = React.Children.toArray(children).find(child => child.type === List.Body);

  return (
    <div className="list-container">
      <div className="list-wrapper">
        {header}
        <PageSection title={title}>
          <div className="list-body-container">
            {body}
          </div>
        </PageSection>
      </div>
    </div>
  );
};

List.Header = ({ children }) => <>{children}</>;
List.Body = ({ children }) => <>{children}</>;

export default List;

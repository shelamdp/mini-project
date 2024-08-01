import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SearchForm = ({ onSearch }) => {
  const [orgName, setOrgName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(orgName);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="orgName">Organization Name</Label>
        <div className="d-flex gap-2">
          <Input
            type="text"
            name="orgName"
            id="orgName"
            placeholder="Enter GitHub organization name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <Button outline type="submit" color="primary">
            Search
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
};

export default SearchForm;

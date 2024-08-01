import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import SearchForm from "./components/SearchForm";
import RepoList from "./components/RepoList";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [isSetTotalPage, setIsSetTotalPage] = useState(true);
  const [sortField, setSortField] = useState({
    field: "full_name",
    dir: "asc",
  });

  const fetchRepos = async (orgName, pageNumber, sortField) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/orgs/${orgName}/repos`,
        {
          params: {
            sort: sortField?.field,
            direction: sortField?.dir,
            per_page: 10,
            page: pageNumber,
          },
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );

      setRepos(response.data);

      if (isSetTotalPage) {
        const linkHeader = response.headers.link;
        let totalPages = 1;
        if (linkHeader) {
          const links = linkHeader.split(", ");
          const lastLink = links.find((link) => link.includes('rel="last"'));
          if (lastLink) {
            const lastPage = new URLSearchParams(
              lastLink.split("; ")[0].slice(1, -1)
            ).get("page");
            totalPages = parseInt(lastPage, 10);
          }
        }
        setTotalPages(totalPages);
        setIsSetTotalPage(false);
      }
    } catch (error) {
      console.log("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (orgName) => {
    setOrgName(orgName);
    if (orgName) {
      setIsSetTotalPage(true);
      setPage(1);
    } else {
      setRepos([]);
      setPage(1);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    if (orgName) {
      fetchRepos(orgName, page, sortField);
    } else {
      setRepos([]);
      setTotalPages(1);
    }
  }, [orgName, page, sortField]);

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>GitHub Organization Repositories</h1>
          <SearchForm onSearch={handleSearch} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <RepoList
            repos={repos}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            loading={loading}
            setSortField={setSortField}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

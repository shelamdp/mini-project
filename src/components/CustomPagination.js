import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Button, Card, CardFooter } from "reactstrap";

const CustomPagination = ({ page, setPage, totalPages }) => {
  return (
    <Card>
      <CardFooter
        className="border border-top-0"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-sm">{`Page ${page} of ${totalPages}`}</div>
          <div className="d-flex flex-centered gap-1">
            <Button
              outline
              disabled={page === 1}
              size="sm"
              color="secondary"
              onClick={() => setPage(page - 1)}
            >
              <ArrowLeft size={20} />
            </Button>
            <Button
              outline
              disabled={page === totalPages}
              size="sm"
              color="secondary"
              onClick={() => setPage(page + 1)}
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomPagination;

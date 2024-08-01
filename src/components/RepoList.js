import DataTable from "react-data-table-component";
import { ChevronDown, Star } from "react-feather";
import { Spinner } from "reactstrap";
import moment from "moment-timezone";
import CustomPagination from "./CustomPagination";

const RepoList = ({
  repos,
  page,
  setPage,
  totalPages,
  loading,
  setSortField,
}) => {
  const columns = [
    {
      name: "Name",
      cell: (row) => <span>{row?.name}</span>,
      sortable: true,
      sortField: "full_name",
    },
    {
      name: "Stars",
      cell: (row) => (
        <span className="d-flex align-items-center gap-1">
          <Star size={16} className="text-secondary" /> {row?.stargazers_count}
        </span>
      ),
    },
    {
      name: "Created At",
      cell: (row) => (
        <span>{moment(row?.created_at).format("Do MMMM YYYY, HH:mm")}</span>
      ),
      sortable: true,
      sortField: "created",
    },
    {
      name: "Commits",
      cell: (row) => (
        <a
          href={row.commits_url.replace("{/sha}", "")}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Commits
        </a>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        color: "#667085",
        backgroundColor: "#F9FAFB",
      },
    },
  };

  const handleSort = (column, sortDirection) => {
    setSortField(() => {
      return { field: column.sortField, dir: sortDirection };
    });
  };

  return (
    <DataTable
      customStyles={customStyles}
      columns={columns}
      data={repos}
      progressPending={loading}
      responsive
      persistTableHead
      progressComponent={<Spinner />}
      sortIcon={<ChevronDown />}
      sortServer
      className="border p-0 border-1 rounded-top"
      pagination
      paginationServer
      defaultSortFieldId={1}
      defaultSortAsc={true}
      paginationComponent={(props) => (
        <CustomPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
      onSort={handleSort}
      paginationTotalRows={totalPages * 10}
      paginationDefaultPage={page + 1}
    />
  );
};

export default RepoList;

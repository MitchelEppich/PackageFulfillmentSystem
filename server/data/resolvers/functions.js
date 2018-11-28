// User filters
const userFilters = ({ OR = [], is_admin }) => {
  const filter = is_admin ? {} : null;

  if (is_admin) {
    filter.admin = is_admin;
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(userFilters(OR[i]));
  }

  return filters;
};

// Log filters
const logFilters = ({ OR = [] }) => {
  const filter = {}; //is_admin ? {} : null;

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(userFilters(OR[i]));
  }

  return filters;
};

module.exports = {
  userFilters,
  logFilters
};

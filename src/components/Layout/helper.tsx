const utils = {
  getOrganizationLogo: (organization_name: string) => {
    console.log(organization_name);

    return organization_name
      .toLowerCase()
      .replace(/ /g, "-")
      .charAt(0)
      .toUpperCase();
  },
};

export default utils;

class Connection {
  getContent = async (site) => {
    const data = await fetch('/get-content', {
      method: 'POST',
      body: JSON.stringify(site),
    });
    const download_post = data.json();
    return download_post;
  };
  addSite = async (site) => {
    const data = await fetch('/get-content', {
      method: 'POST',
      body: JSON.stringify(site),
    });
    const download_post = data.json();
    return download_post;
  };
  getSites = async () => {
    const res = await fetch('/get-site');
    const data = res.json();
    return data;
  };
  deleteSite = async (id_site) => {
    const res = await fetch(`/delete-site?id_site=` + id_site);
    return res.json();
  };
}

export const request = new Connection();

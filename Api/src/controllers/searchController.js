import { toSimpleGameWithPrice } from "./utils/dtos.js";
class SearchController {

  constructor(gobService) {
    this.gobService = gobService;
  }

  search = (req, res) => {
    try {

      const { query } = req.query;
      const { page } = req.query || 1;

      if (page < 0 || !query) {
        return res.status(400).json({ error: "query invalid parameters" });
      }
      const { list, amountOfElements, amountOfPages, currentPage } = this.gobService.searchGame(query, page);
      const games = list.map(toSimpleGameWithPrice);
      res.status(200).json({ amountOfElements, amountOfPages, currentPage, games });
    }
    catch (e) {
      throw res.status(500).json({ error: e.message });
    }
  };

}

export default SearchController;

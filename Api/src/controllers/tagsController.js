import { NotFoundTag } from "@unq-ui/gog-model-js/src/model/Exceptions.js";
import { toSimpleGameWithPrice } from "./utils/dtos.js";
class TagsController {

  constructor(gobService) {
    this.gobService = gobService;
  }

  getTags = (req, res) => {
    try {
      const tags = this.gobService.tags;
      return res.status(200).json(tags);
    } catch (error) {
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getGamesByTag = (req, res) => {
    try {
      const tagId = req.params.id;
      const page = req.query.page || 1;
      if (page <= 0) {
        return res.status(400).json({ error: "The page number must be greater than or equal to 1." });
      }
      const gamesByTag = this.gobService.getGamesByTag(tagId, page);
      gamesByTag.list = gamesByTag.list.map(({ reviews, relatedGames, ...game }) => toSimpleGameWithPrice(game));
      return res.status(200).json(gamesByTag);
    } catch (error) {
      if (error instanceof NotFoundTag) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

}

export default TagsController;
import { DraftPurchase } from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { toSimpleUser } from "./utils/dtos.js";
import { purchaseBodySchema } from "./utils/validations.js";
import { PurchaseException, NotFoundUser } from "@unq-ui/gog-model-js/src/model/Exceptions.js";
import { ValidationError } from "yup";

class PurchaseController {

  constructor(gobService, tokenController) {
    this.gobService = gobService;
    this.tokenController = tokenController;
  }

  buyItems = async (req, res) => {
    try {
      const userId = req.user.id;
      const { cardName, cardNumber, cardExpiration, cardCvv } = await purchaseBodySchema.validate(req.body);
      const purchase = new DraftPurchase(cardNumber, cardName, cardExpiration, cardCvv);
      const user_purchase = this.gobService.purchase(userId, purchase);
      return res.status(200).json(toSimpleUser(user_purchase));
    } catch (e) {
      if (e instanceof PurchaseException || e instanceof ValidationError) {
        return res.status(400).json({ error: e.message });
      }
      if (e instanceof NotFoundUser) {
        return res.status(404).json({ error: e.message });
      }
      return res.status(500).json({ error: e.message });
    }
  };

}

export default PurchaseController;

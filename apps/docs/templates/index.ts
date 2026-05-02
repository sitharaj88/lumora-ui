/**
 * Template registry side-effect import. Importing this module registers every
 * template with the central registry so the dynamic /preview route can resolve
 * any template + page combination.
 */
import { adminTemplate } from "./admin";
import { analyticsTemplate } from "./analytics";
import { crmTemplate } from "./crm";
import { ecommerceTemplate } from "./ecommerce";
import { marketingTemplate } from "./marketing";
import { projectTemplate } from "./project";
import { registerTemplate, templateRegistry } from "../lib/templates-registry";

registerTemplate(adminTemplate);
registerTemplate(crmTemplate);
registerTemplate(projectTemplate);
registerTemplate(ecommerceTemplate);
registerTemplate(marketingTemplate);
registerTemplate(analyticsTemplate);

export { templateRegistry };

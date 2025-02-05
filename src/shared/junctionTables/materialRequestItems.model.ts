import { DataTypes, Model } from "sequelize";
import Project from "../../modules/project/v1/projects.model";
import sequelize from "../../config/db/config";
import Item from "../../modules/items/v1/item.model";
import ProjectMaterialRequest from "../../modules/projectMaterialRequest/v1/projectMaterialRequest.model";

class MaterialRequestItems extends Model { }

MaterialRequestItems.init(
    {
        itemId: {
            type: DataTypes.UUID,
            references: {
                model: Item,
                key: "id",
            },
        },
        requestId: {
            type: DataTypes.UUID,
            references: {
                model: ProjectMaterialRequest,
                key: "id",
            }
        },
        wantedQuantity: {
            type: DataTypes.INTEGER,
        },
        deliveredQuantity: {
            type: DataTypes.INTEGER,
        },

    },
    {
        sequelize,
        modelName: "material_request_items",
        indexes: [{ fields: ["requestId"] }]
    }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default MaterialRequestItems;

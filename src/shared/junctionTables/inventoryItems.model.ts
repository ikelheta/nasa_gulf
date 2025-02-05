import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db/config";
import Item from "../../modules/items/v1/item.model";
import Inventory from "../../modules/inventories/v1/inventory.model";

class InventoryItems extends Model { }

InventoryItems.init(
    {
        itemId: {
            type: DataTypes.UUID,
            references: {
                model: Item,
                key: "id",
            },
        },
        inventoryId: {
            type: DataTypes.UUID,
            references: {
                model: Inventory,
                key: "id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue : 0
        },
    },
    {
        sequelize,
        modelName: "inventory_items",
        indexes: [
            { fields: ["inventoryId"] },
            { fields: ["itemId"] },
        ]
    }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default InventoryItems;

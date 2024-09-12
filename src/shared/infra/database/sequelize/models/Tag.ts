export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "tag",
    {
      tag_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "member",
          key: "member_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "tag",
    }
  );

  Tag.associate = (models) => {
    Tag.belongsTo(models.Member, {
      foreignKey: "member_id",
      targetKey: "member_id",
      as: "Member",
    });
  };

  return Tag;
};

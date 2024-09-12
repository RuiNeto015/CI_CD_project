export default (sequelize, DataTypes) => {
  const TagPost = sequelize.define(
    "tag_post",
    {
      post_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "post",
          key: "post_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      tag_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "tag",
          key: "tag_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "tag_post",
    }
  );

  TagPost.associate = (models) => {
    TagPost.belongsTo(models.Post, { foreignKey: "post_id", targetKey: "post_id", as: "Post" });
  };

  return TagPost;
};

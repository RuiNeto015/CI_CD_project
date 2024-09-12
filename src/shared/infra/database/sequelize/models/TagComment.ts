export default (sequelize, DataTypes) => {
  const TagComment = sequelize.define(
    "tag_comment",
    {
      comment_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "comment",
          key: "comment_id",
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
      tableName: "tag_comment",
    }
  );

  TagComment.associate = (models) => {
    TagComment.belongsTo(models.Comment, {
      foreignKey: "comment_id",
      targetKey: "comment_id",
      as: "Comment",
    });
  };

  return TagComment;
};

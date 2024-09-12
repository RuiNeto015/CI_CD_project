import {AggregateRoot} from "../../../shared/domain/AggregateRoot";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";
import {Result} from "../../../shared/core/Result";
import {Guard, IGuardArgument} from "../../../shared/core/Guard";
import {TagId} from "./tagId";
import {TagName} from "./tagName";

/**
 * Represents the properties required to create a Tag.
 */
export interface TagProps {
    /**
     * The unique identifier of the member associated with the tag.
     */
    memberId: UniqueEntityID;

    /**
     * The name of the tag.
     */
    name: TagName;
}

/**
 * Gets the unique identifier for the post tag.
 * @returns {TagId} The post tag identifier.
 */
export class Tag extends AggregateRoot<TagProps> {
    get postTagId(): TagId {
        return TagId.create(this._id).getValue();
    }

    /**
     * Gets the unique identifier of the member associated with the tag.
     * @returns {UniqueEntityID} The member identifier.
     */
    get memberId(): UniqueEntityID {
        return this.props.memberId;
    }

    /**
     * Gets the name of the tag.
     * @returns {TagName} The tag name.
     */
    get name(): TagName {
        return this.props.name;
    }

    /**
     * Private constructor for creating a new Tag instance.
     * @param {TagProps} props - The properties of the Tag.
     * @param {UniqueEntityID} id - The unique identifier of the Tag.
     */
    private constructor(props: TagProps, id?: UniqueEntityID) {
        super(props, id);
    }

    /**
     * Creates a new Tag instance.
     * @param {TagProps} props - The properties of the Tag.
     * @param {UniqueEntityID} id - The unique identifier of the Tag.
     * @returns {Result<Tag>} A Result object containing either the created Tag or an error.
     */
    public static create(props: TagProps, id?: UniqueEntityID): Result<Tag> {
        const guardArgs: IGuardArgument[] = [
            {argument: props.memberId, argumentName: "memberId"},
            {argument: props.name, argumentName: "name"},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

        if (guardResult.isFailure) {
            return Result.fail<Tag>(guardResult.getErrorValue());
        }

        const defaultValues: TagProps = {
            ...props,
        };

        const tag = new Tag(defaultValues, id);
        return Result.ok<Tag>(tag);
    }
}

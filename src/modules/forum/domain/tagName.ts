import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface TagNameProps {
  value: string;
}

export class TagName extends ValueObject<TagNameProps> {
  public static minLength: number = 3;
  public static maxLength: number = 10;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TagNameProps) {
    super(props);
  }

  public static create(props: TagNameProps): Result<TagName> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, "name");

    if (nullGuardResult.isFailure) {
      return Result.fail<TagName>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<TagName>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<TagName>(maxGuardResult.getErrorValue());
    }

    return Result.ok<TagName>(new TagName(props));
  }
}

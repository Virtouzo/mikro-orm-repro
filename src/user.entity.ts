import {
	Check,
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Ref,
} from "@mikro-orm/core";

@Check<User>({
	name: "check_invoice_part_with_belonging_item",
	expression: `CASE WHEN type = 'CHILDREN' THEN belongs_to_item_id IS NOT NULL ELSE TRUE END`,
})
@Entity()
export class User {
	@PrimaryKey()
	id!: number;

	@Property()
	name: string;

	@Property({ unique: true })
	email: string;

	@Property()
	type!: string;

	@ManyToOne({
		entity: () => User,
		nullable: true,
	})
	belongsToItem?: Ref<User>;

	constructor(name: string, email: string) {
		this.name = name;
		this.email = email;
	}
}

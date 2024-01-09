import { db } from '~/server/db';
import type { Team } from '~/components/form';

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as Team;
		if (process.env.REGISTRATIONS_STARTED === 'false') {
			console.log(process.env.REGISTRATIONS_STARTED);
			return Response.json({
				error: 'Registrations are closed',
			});
		}
		const leader = body.teamLeader;
		const teamExists = await db.team.findFirst({
			where: {
				teamName: body.teamName,
			},
		});
		if (teamExists?.id) {
			return Response.json({
				error: 'Team with this name already exists',
			});
		}
		const uniqueMembers = await db.teamMember.findMany({
			where: {
				email: {
					in: [...body.teamMembers.map((m) => m.email), body.teamLeader.email],
				},
				phoneNumber: {
					in: [
						...body.teamMembers.map((m) => m.phoneNumber),
						body.teamLeader.phoneNumber,
					],
				},
			},
		});
		console.log(uniqueMembers);
		if (uniqueMembers.length) {
			return Response.json({
				error: `Members with same email or phone number already exists ${uniqueMembers
					.map((m) => m.name)
					.join(', ')}`,
			});
		}

		const res = await db.team.create({
			data: {
				teamName: body.teamName,
				members: {
					create: [
						{
							name: leader.name,
							email: leader.email,
							phoneNumber: leader.phoneNumber,
							isLeader: true,
						},
						...body.teamMembers,
					],
				},
			},
		});

		return Response.json(res);
	} catch (err) {
		const error = String(err);
		console.log(error);
		return Response.error();
	}
}

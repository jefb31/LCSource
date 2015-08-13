/*
 * Player entity.
 */
4
%{
#include "StdH.h"
#include <Engine/Entities/InternalClasses.h>
#include <Engine/Base/Stream.h>
%}

class export CPlayerEntity : CMovableModelEntity {
name      "PlayerEntity";
thumbnail "";
features "AbstractBaseClass";
properties:
  1 FLOAT en_tmPing = 0.0f,    // ping value in seconds (determined by derived class and distributed by the engine)
//  2 INDEX m_iLastActionTime = 1, // when was the last action applied to this player entity (in milliseconds)
  //3 INDEX m_iMyIndex = -1, //0423
{
  CPlayerCharacter en_pcCharacter;   // character of the player
  CPlacement3D en_plViewpoint;       // placement of view point relative to the entity
  CPlacement3D en_plLastViewpoint;   // last view point (used for lerping)
}
components:
functions:
  /* Initialize this player */
  void InitializePlayer(ULONG ulWeaponsID,ULONG ulAnimatorID) 
  {
    EPlayerInit ePLInit;
    ePLInit.ulWeaponsID = ulWeaponsID;
    ePLInit.ulAnimatorID = ulAnimatorID;
    ePLInit.bCreate = TRUE;
    Initialize(ePLInit,FALSE);
  }

  // override in player.es
  // FIXME : SetWeaponAndAnimator()�� ���ŵǾ� �ҵ�...
  virtual void SetWeaponAndAnimator(){};

  /* Is this a player entity? - Yes - override for IsPlayer from Entity.h*/
  virtual BOOL IsPlayer() {return TRUE;};

  // Dump player info to the console
  virtual void DumpToConsole(){};

  // virtual functions for reading/writing player data for transmission over network, redefined in Player.es
//  virtual void Read_net(CNetworkMessage *istr,TIME tmNewTime) {};
//  virtual void Write_net(CNetworkMessage *ostr) {};

//  virtual void Read_net_brief(CNetworkMessage *istr,TIME tmNewTime) {};
//  virtual void Write_net_brief(CNetworkMessage *ostr) {};


	// FIXME : �� �̷������� �صа���?��.��
  virtual void Read_net_Mob(int index, CNetworkMessage *istr) {};
  virtual void Read_net_Character(int type, int sub_type, CNetworkMessage *istr) {};
  virtual void Read_net_Pet(int index, CNetworkMessage *istr) {};
  virtual void Read_net_WildPet(int index, CNetworkMessage *istr) {};
  virtual void Read_net_Summon(int index, CNetworkMessage *istr) {};
  virtual void Read_net_Damage_Character(CNetworkMessage *istr) {};
  virtual void Read_net_Damage( SBYTE sbType, CNetworkMessage *istr) {};
  virtual void Read_net_DissappearEffect(CNetworkMessage* istr)	{}
  virtual void Read_net_StatusPC(CNetworkMessage *istr) {};
  virtual void Read_net_StatusNPC(CNetworkMessage *istr) {};
  virtual void Read_net_StatusPet(CNetworkMessage *istr) {};
  virtual void Read_net_StatusElemental(CNetworkMessage *istr) {};  
  virtual void ProcessProduce(SBYTE sbChaType, SLONG slChaIndex, SBYTE sbTargetType, SLONG slTargetIndex, SLONG slTargetHP) {};
  
  virtual void StandDown( BOOL bStand ) {};  
  virtual void OpenGate( int iGateNumber, BOOL bOpenGate ) {};
  virtual void SetMobData(CEntity* penEntity, SLONG hp, SLONG maxHp, int level, BOOL bNpc, int mobIdx) {};
  virtual void SetChaData(int index, int type, ULONG hp, ULONG maxHp, SBYTE hairstyle, SBYTE facestyle, CTString& strName, UWORD state, SBYTE pkTitle, SLONG pkstate) {};
  virtual void SetPetData(CEntity* penEntity, SLONG hp, SLONG maxHP) {};  
  virtual void SetWildPetData(CEntity* penEntity, SLONG hp, SLONG maxHP) {};
  virtual void SetElementalData(CEntity* penEntity, SLONG hp, SLONG maxHP ) {};
  virtual void SetElementalStatus(CEntity* penEntity, SBYTE sbAttackSpeed, SBYTE sbMagicSpeed, LONG lSkillSpeed, FLOAT fWalkSpeed, FLOAT fRunSpeed, FLOAT fAttackRange ){};
  virtual void SetShopData( INDEX index, SBYTE sbShopType) {};
  
  // [100107: selo] Ʈ���̳ʸ� ���ϱ� ���� �߿� �Ӽ� ���� ����
  virtual void SetImportantValues( FLOAT fWalkspeed, FLOAT fRunspeed, FLOAT fAttackrange, SBYTE sbAttackspeed, SBYTE sbMagicspeed ) {};
  virtual FLOAT GetWalkspeed() { return 0.0f; };
  virtual FLOAT GetRunspeed() { return 0.0f; };
  virtual FLOAT GetAttackrange() { return 0.0f; };
  virtual SBYTE GetAttackspeed() { return 0; };
  virtual SBYTE GetMagicspeed() { return 0; };
  
  virtual void SetSkillCancel( BOOL bCanSkillCancel ){};

  virtual void StartCamera(CEntity *pTarget, BOOL bRestart) {};
  virtual void SetWideScreen(CEntity *pTarget, BOOL bWide, FLOAT fFov) {};
  virtual void GetProjection(CAnyProjection3D& apr) {};

  virtual void LostTarget(){};
  virtual void UseSkill(int skillIndex){};
  virtual void UsePetPickItem(){};
  virtual void UsePetSkill(int skillIndex){};
  virtual void UseSlaveSkill(CEntity *pEntity, int skillIndex){};
  virtual void UseWildSkill(CEntity *pEntity, int skillIndex){};
//  virtual void UseAction(int ActionIndex){};//0807
  virtual void CancelSkill(BOOL bLostTarget, BOOL bAutoAttack, BOOL bSkillError){};
  virtual void LoadSkillAnimID(){};
  virtual void UseAction(int ActionIndex){};
  virtual void StopMove(){};
  virtual void ClearMove() {}
  

  virtual void SetProduct(SLONG slChaIndex, SBYTE slProductType) {};
  virtual void SetConsensus(SLONG slChaIndex) {};
  virtual void WarpTeleport( FLOAT fX, FLOAT fZ, FLOAT fH, FLOAT fR, SBYTE sbLayer ) {};
  
  virtual   void SingleModeOn() {};
  virtual   void FieldModeOn() {};

  virtual void SetLegit(UBYTE sbType, SLONG chaindex) {};
  virtual void SetRepairLegit(SLONG chaindex, CCharacterTarget *Ct) {};
  virtual BOOL IsLegit(){return FALSE; };
  virtual void ClearMultiTargets() {};

  virtual void RidingPet(CEntity *pCharacter, INDEX iPetType ) {};
  virtual void LeavingPet(CEntity *pCharacter ) {};
  virtual BOOL IsRidePet( CEntity *pCharacter ) { return FALSE; };
  
  virtual void RidingWildPet(CEntity *pCharacter, CEntity *pWildPet, CTString strFileName ) {};
  virtual void LeavingWildPet(CEntity *pCharacter ) {};


  virtual	BOOL IsMoving() { return FALSE; };
  virtual	BOOL IsActionSitting() { return FALSE; }
  virtual	BOOL IsIdle()	{ return FALSE; }
  // ITS #3744 : ���Ż��� �ľǿ� [8/30/2011 rumist]
  virtual	const BOOL IsTransform() const { return FALSE;	}

  virtual   void ClearTargetInfo(CEntity* penEntity){};

  virtual	void SetCharacterHairChange(INDEX nSIdx, SBYTE sbType, BOOL IsMe) {};
  virtual	void SetCharacterAppearance(CModelInstance *pMI, int iJob, SBYTE sbHairStyle, SBYTE sbFaceStyle)	{};
  virtual	void ChangeFaceMesh(CModelInstance *pMI, int iJob, SBYTE sbType)	{};		// �Ӹ� �ٲٱ�  
  virtual	void ChangeHairMesh(CModelInstance *pMI, int iJob, SBYTE sbType)	{};		// ��� ��Ÿ�� �ٲٱ�

  // add for collect quest 060721
  virtual	void CancelProduct() {};
  virtual	void DeleteWearingWeapon(BOOL bException, BOOL bMode) {};
  virtual	void AppearWearingWeapon(BOOL bSkillEnd) {};

//  virtual	void WearingArmor(SLONG tabId, SLONG rowId, SLONG colId) {};
  virtual	void DeleteDefaultArmor(int type) {};
  virtual	void WearingDefaultArmor(int type) {};
  virtual	void DeleteCurrentArmor(int weartype) {};
  virtual	void SetChaWearing(class CCharacterTarget* pTarget, CEntity* penEntity, CNetworkMessage *istr) {};
  virtual	void SetCharCostumeWearing(class CCharacterTarget* pTarget, CEntity* penEntity, CNetworkMessage *istr) {};
  virtual	void WearingCostumeArmor( CNetworkMessage *istr ) {};
  virtual	void WearingCostumeArmorOneSuit( CNetworkMessage *istr ) {};	// added by sam 11/02/07 [SAM] �ڽ�Ƭ2 �ѹ��ǻ� �Ա�/���� (�ڽ��� �ƴ� �ٸ� ĳ����)
  virtual	BOOL IsHelmet(INDEX iCharIndex)	{ return FALSE;	}
  virtual   void Rebirth(){};
  virtual   void DeathYou(){};
  virtual   void PlayerInit(bool bDeath){};
  virtual   BOOL IsAlreadyDie(){return FALSE;};
  virtual   void SetDie(){};
  virtual	void SetTarget(CEntity* penEntity){};
  virtual	void SetTarget( SLONG targetID, SBYTE targetType ){};
  virtual	BOOL IsSameTarget(CEntity* penEntity){return FALSE;}

  virtual void SetTargetMe(){};
  virtual void PlayItemSound(BOOL bPick, BOOL bMoney){};
  virtual void PlayButtonSound(){};
  virtual void PlayJewelDullSound(){};
  virtual void PlayJewelRefinementSound(){};
  virtual void PlayJewelShinySound(){};
  virtual void PlayPetStashEffectSound(){};
  virtual void PlayPetStashCardSelSound(){};
  virtual void PlayHolyWaterSound(){};
  
  virtual void CommandAttack(){};
  virtual BOOL CommandAction(){ return FALSE; };		//���Ѹ��� �׼��� ����ϱ� ���� Ÿ���� ����

  virtual void PlayBGM(CTFileName fnFileName){};
  
  virtual void SearchNearItem(){};
  virtual void SetCharacterState(CEntity* cha_Entity, INDEX ch_state) {};
  // FIXME : ���¸� Ȯ���ϴµ� �Ź� �̷��� ã�ƾ� �ϴ°�?
  virtual BOOL IsSkilling(){return FALSE;};
  virtual BOOL IsSitting(){return FALSE;};
  virtual BOOL IsAttacking() { return FALSE; };
  virtual BOOL IsPetActing() { return FALSE; };
  virtual BOOL IsProduct() { return FALSE; };
  virtual void SetSpeedUp(BOOL bMe, INDEX index, BOOL bSpeedup){};
  // �̱�ȯ �߰� (04.12.29) : ESCŰ�� ��� �Ǵ� ���۵��� Ȱ��ȭ �Ǿ� �ִ��� üũ 
  virtual BOOL CheckEscKey (void) { return FALSE; } 
  virtual void PlayItemEffect(SLONG itemindex, SBYTE effecttype){};
  virtual BOOL IsSocialActing(){ return FALSE; }
  virtual BOOL IsPolymophing(){ return FALSE; }
  virtual BOOL IsTransforming(){ return FALSE; }
  virtual BOOL IsChanging() { return FALSE; }
  virtual void AppearChaPolymoph(CEntity* pentity, INDEX mobindex){};
  virtual void TransfromPet(CEntity* pentity, INDEX mobIndex, INDEX mobSize){};
  virtual void ReturnTransformPet(CEntity* pentity){};

  virtual void TransformSorcerer( int iType ){};
  virtual void ReturnSorcerer(){};
  virtual void AppearChaTransform( CEntity* pEntity, INDEX iTransformType ){};

  // eons �߰� (061207) : �Ǽ��縮 ����� Effect����
  virtual void PlAddAccessoryEffect(CEntity *penEntity, CCharacterTarget* pTarget){};

  virtual void EnemyTargetSelected_InputTab() {};

  // ���� ���� & ���� ����.
  virtual void EvocationStart( LONG lIndex, int nSkillIndex){};
  virtual void EvocationStop( LONG lIndex){};
  virtual BOOL CheckChangeCondition(INDEX level, INDEX zone){ return FALSE;};  
  virtual void SetSummonCommand( CEntity* pEntity, INDEX iCommand ) {};

  virtual BOOL CheckNormalAttack( CEntity *pEntity, FLOAT fDist ) { return FALSE; }
  virtual CModelInstance* GetPlayerModelInstance( CEntity* pEntity ) { return NULL; }
  virtual BOOL CheckAttackTarget( INDEX iSkillIndex, CEntity *pEntity, FLOAT fDist ) { return FALSE; };  
  virtual BOOL CheckEntityOfTarget(CEntity *pEntity, CEntity *pTarget) { return FALSE; }

  virtual void ReturnChange( BOOL bAppear ){};
//������ ���� ����	//(5th Closed beta)(0.2)
	//���� ���� ������ ������ ���� item drop�ϴ� ���� ����.
	//���� �׷� ��찡 ����ٸ� �����ؾ���.
	virtual void AddDeathItem(CEntity *penEnemy, FLOAT3D pos, class CItemTarget *pItemTarget, class CItemData *pItemData) {};
//������ ���� ��	//(5th Closed beta)(0.2)

	virtual void ReceiveTriggerEvent(INDEX iIn, INDEX iOut, INDEX iContinued, CNetworkMessage *iStr){};
	virtual void ReceiveRaidScene(CNetworkMessage *istr) {};
	virtual void SendTriggerEvent(INDEX iTarget, INDEX eetEventType/* EET_TRIGGER */) {};
	virtual CEntity* GetClickObject(void) { return NULL; }
	// ������ �ູ �ý��� �۾��� �߰� wooss
	virtual void DropDeathItem(CEntity *penEnemy) {};
	
	virtual void HUD_DrawModel(CDrawPort* pdp, FLOAT fMinX, FLOAT fMinY, FLOAT fMaxX, FLOAT fMaxY, INDEX iType, FLOAT fDistance, FLOAT fHeight) {};
	virtual FLOAT GetAnimationTime() { return 0.0f; }
	virtual void HUD_SetCharModelData(INDEX iJob, INDEX iHairStyle, INDEX iFaceStyle) {};
	virtual void HUD_SetModelData(INDEX iType, INDEX iIndex) {};
	virtual void HUD_WearingModel(INDEX iType, INDEX iJob, INDEX iItem, BOOL bLogin) {};
	virtual void HUD_ChangeHairMesh(INDEX iJob, INDEX iHairStyle) {};
	virtual void HUD_ChangeFaceMesh(INDEX iJob, INDEX iFaceStyle) {};
	virtual void HUD_PlayAnimation(INDEX iJob, INDEX AnimID) {};
	virtual void HUD_PlayAnimation(CTString strAniName) {};
	virtual void HUD_SetModelColor(const COLOR ModelColor)	{};
	virtual void SetDecoModeCamera( FLOAT fDistance, FLOAT fHeight ) {};
	virtual void SetAppearanceData( int inde, SBYTE hairstyle, SBYTE facestyle ) {};
  /* Get name of this player. */
  export CTString GetPlayerName(void)
  {
    return en_pcCharacter.GetNameForPrinting();
  }
  export const CTString &GetName(void) const
  {
    return en_pcCharacter.GetName();
  }
  /* Get index of this player in the game. */
  // FIXME : GetMyPlayerIndex�� ��ȯ�ϴ� ���� ������ 0.
  // FIXME : ����, �� �κ��� �� ��� �κ��� �����Ұ�.
  export INDEX GetMyPlayerIndex(void)
  {
    CEntity *penMe = this;
    for (INDEX iPlayer=0; iPlayer<GetMaxPlayers(); iPlayer++) {
      // if this is ME (this)
      if (GetPlayerEntity(iPlayer)==penMe) {
        return iPlayer;
      }
    }
    // must find my self
    return 15;  // if not found, still return a relatively logical value
  }

  /* Calculate physics for moving. */
  export void DoMoving(void)  // override from CMovableEntity
  {
    CMovableModelEntity::DoMoving();
  }

  /* Copy entity from another entity of same class. */
  export void Copy(CEntity &enOther, ULONG ulFlags)
  {
    CMovableModelEntity::Copy(enOther, ulFlags);

    CPlayerEntity *ppenOther = (CPlayerEntity *)(&enOther);
    en_pcCharacter = ppenOther->en_pcCharacter;
    en_plViewpoint = ppenOther->en_plViewpoint;
    en_plLastViewpoint = ppenOther->en_plLastViewpoint;
  }

  /* Copy entity from another entity of same class. */
  /*CPlayerEntity &operator=(CPlayerEntity &enOther)
  {
    CMovableModelEntity::operator=(enOther);
    en_pcCharacter = enOther.en_pcCharacter;
    en_plViewpoint = enOther.en_plViewpoint;
    return *this;
  }*/
  /* Read from stream. */
  export void Read_t( CTStream *istr,BOOL bNetwork) // throw char *
  {
    CMovableModelEntity::Read_t(istr,bNetwork);
    (*istr)>>en_pcCharacter>>en_plViewpoint;
    en_plLastViewpoint = en_plViewpoint;
  }
  /* Write to stream. */
  export void Write_t( CTStream *ostr,BOOL bNetwork) // throw char *
  {
    CMovableModelEntity::Write_t(ostr,bNetwork);
    (*ostr)<<en_pcCharacter<<en_plViewpoint;
  }

  // Apply the action packet to the entity movement.
  export virtual void ApplyAction(const CPlayerAction &pa, FLOAT tmLatency) {};
  // Called when player is disconnected
  export virtual void Disconnect(void) {};

  // Called when player character is changed
  // FIXME : CharacterChanged�� �� ��� �κ� �����Ұ�.
  export virtual void CharacterChanged(const CPlayerCharacter &pcNew) { en_pcCharacter = pcNew; };

  // provide info for GameSpy enumeration
  //export virtual void GetGameSpyPlayerInfo(INDEX iPlayer, CTString &strKeys) { };

procedures:
  // must have at least one procedure per class
  Dummy() {};
};